import { TServiceParams } from "@digital-alchemy/core";
import dayjs, { Dayjs } from "dayjs";

import { GROCY_DATABASE_UPDATED } from "../helpers";

export function System({ lifecycle, grocy, logger }: TServiceParams) {
  lifecycle.onBootstrap(async () => {
    try {
      this.LAST_CHANGED_TIME = await this.getSystemDbChangedTime();
    } catch {
      this.logger.fatal("Cannot contact grocy");
    }
    setInterval(async () => {
      try {
        const last = await this.getSystemDbChangedTime();
        if (last.isAfter(this.LAST_CHANGED_TIME)) {
          this.LAST_CHANGED_TIME = last;
          this.event.emit(GROCY_DATABASE_UPDATED);
        }
      } catch (error) {
        this.logger.error({ error }, "Grocy database time poll failed");
      }
    }, this.pollInterval);
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
