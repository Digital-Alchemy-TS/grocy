import {
  CronExpression,
  eachLimit,
  TServiceParams,
} from "@digital-alchemy/core";

import {
  BATTERY_CACHE_UPDATED,
  CHORE_CACHE_UPDATED,
  GROCY_REBUILD_CACHE,
  GrocyBattery,
  GrocyChore,
  GrocyObjectChoreDetail,
  GrocyTask,
  TASK_CACHE_UPDATED,
} from "../helpers";

export function Aggregator<USERFIELDS extends object>({
  scheduler,
  logger,
  grocy,
  event,
  config,
  lifecycle,
}: TServiceParams) {
  async function refresh() {
    await aggregator.buildBatteryCache();
    await aggregator.buildChoresCache();
    await aggregator.buildTaskCache();
    GROCY_REBUILD_CACHE.setToCurrentTime();
  }
  lifecycle.onPostConfig(async () => await refresh());
  scheduler.cron({
    exec: async () => await refresh(),
    schedule: CronExpression.EVERY_2_HOURS,
  });

  const aggregator = {
    BATTERY_CACHE: new Set<GrocyBattery & { userfields: USERFIELDS }>(),
    CHORES_CACHE: new Set<GrocyObjectChoreDetail<USERFIELDS> & GrocyChore>(),
    TASKS_CACHE: new Set<GrocyTask & { userfields: USERFIELDS }>(),

    async buildBatteryCache(): Promise<void> {
      const battery = await grocy.battery.listBatteries();
      const cache = new Set<GrocyBattery & { userfields: USERFIELDS }>();

      await eachLimit(
        battery,
        config.grocy.USERFIELDS_FETCH_RATE,
        async battery => {
          const userfields =
            await grocy.object.listObjectUserFields<USERFIELDS>({
              id: battery.id.toString(),
              type: "batteries",
            });
          cache.add({
            ...battery,
            userfields,
          });
        },
      );
      aggregator.BATTERY_CACHE = cache;
      event.emit(BATTERY_CACHE_UPDATED);
      logger.debug("Battery cache updated");
    },

    async buildChoresCache(): Promise<void> {
      const chores = await grocy.chores.listChores();
      const cache = new Set<GrocyObjectChoreDetail<USERFIELDS> & GrocyChore>();

      await eachLimit(
        chores,
        config.grocy.USERFIELDS_FETCH_RATE,
        async chore => {
          const data = (await grocy.chores.getChoreObject(
            chore.id,
          )) as GrocyObjectChoreDetail<USERFIELDS>;
          cache.add({ ...chore, ...data });
        },
      );
      aggregator.CHORES_CACHE = cache;
      event.emit(CHORE_CACHE_UPDATED);
      logger.debug("Chore cache updated");
    },

    async buildTaskCache(): Promise<void> {
      const tasks = await grocy.tasks.listTasks();
      const cache = new Set<GrocyTask & { userfields: USERFIELDS }>();

      await eachLimit(tasks, config.grocy.USERFIELDS_FETCH_RATE, async task => {
        const userfields = await grocy.object.listObjectUserFields<USERFIELDS>({
          id: task.id.toString(),
          type: "tasks",
        });
        cache.add({
          ...task,
          userfields,
        });
      });
      aggregator.TASKS_CACHE = cache;
      event.emit(TASK_CACHE_UPDATED);
      logger.debug("Task cache updated");
    },
  };
  return aggregator;
}
