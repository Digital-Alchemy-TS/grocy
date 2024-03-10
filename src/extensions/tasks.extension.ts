import { TServiceParams } from "@digital-alchemy/core";

import { GrocyTask } from "../helpers";

export function Tasks({ logger, grocy }: TServiceParams) {
  return {
    async listTasks() {
      logger.trace("listTasks");
      return await grocy.fetch<GrocyTask[]>({
        url: "/tasks",
      });
    },
  };
}
