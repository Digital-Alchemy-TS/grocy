import { TServiceParams } from "@digital-alchemy/core";
import dayjs, { Dayjs } from "dayjs";

import { GROCY_DATABASE_UPDATED } from "../helpers";

export function System({ lifecycle, grocy, logger, event, config }: TServiceParams) {
  let LAST_CHANGED_TIME: Dayjs;

  lifecycle.onBootstrap(async () => {
    try {
      LAST_CHANGED_TIME = await grocy.system.getSystemDbChangedTime();
    } catch {
      logger.fatal("Cannot contact grocy");
    }
    setInterval(async () => {
      try {
        const last = await grocy.system.getSystemDbChangedTime();
        if (last.isAfter(LAST_CHANGED_TIME)) {
          LAST_CHANGED_TIME = last;
          event.emit(GROCY_DATABASE_UPDATED);
        }
      } catch (error) {
        logger.error({ error }, "Grocy database time poll failed");
      }
    }, config.grocy.POLL_INTERVAL);
  });

  return {
    LAST_CHANGED_TIME: Dayjs,

    async getSystemConfig() {
      logger.trace("getSystemConfig");
      return await grocy.fetch({
        url: `/system/config`,
      });
    },

    async getSystemDbChangedTime() {
      logger.trace("getSystemDbChangedTime");
      const time = await grocy.fetch<{ changed_time: string }>({
        url: `/system/db-changed-time`,
      });

      return dayjs(time.changed_time.replace(" ", "T") + ".000Z");
    },

    async getSystemInfo() {
      logger.trace("getSystemInfo");
      return await grocy.fetch({
        url: `/system/info`,
      });
    },

    async getSystemTime() {
      logger.trace("getSystemTime");
      return await grocy.fetch({
        url: `/system/time`,
      });
    },
  };
}
