import { TServiceParams } from "@digital-alchemy/core";

import { GrocyChore, GrocyChoreDetails, GrocyObjectChoreDetail } from "../helpers/index.mts";

type ExecuteChoreRequest = {
  done_by: number;
  skipped: boolean;
  tracked_time: Date;
};

export function Chores({ grocy, logger }: TServiceParams) {
  return {
    async executeChore(id: string) {
      logger.trace("executeChore");
      return await grocy.fetch({
        body: {
          done_by: 0,
          skipped: false,
          tracked_time: new Date(),
        } as ExecuteChoreRequest,
        method: "post",
        url: `/chores/${id}/execute`,
      });
    },

    async executeChoreUndo(id: string) {
      logger.trace("executeChoreUndo");
      return await grocy.fetch({
        method: "post",
        url: `/chores/executions/${id}/undo`,
      });
    },

    async getChore(id: string) {
      logger.trace("getChore");
      return grocy.fetch<GrocyChoreDetails>({
        url: `/chores/${id}`,
      });
    },

    async getChoreObject(id: number) {
      logger.trace("getChoreObject");
      return await grocy.fetch<GrocyObjectChoreDetail>({
        url: `/objects/chores/${id}`,
      });
    },

    async listChores() {
      logger.trace("listChores");
      return await grocy.fetch<GrocyChore[]>({
        url: `/chores`,
      });
    },

    async mergeChores(keep: string, remove: string) {
      logger.trace("mergeChores");
      return await grocy.fetch({
        method: "post",
        url: `/chores/${keep}/merge/${remove}`,
      });
    },

    async printLabel(id: string) {
      logger.trace("printLabel");
      return await grocy.fetch({
        url: `/chores/${id}/printlabel`,
      });
    },

    async recalculateAssignments() {
      logger.trace("recalculateAssignments");
      return await grocy.fetch({
        url: `/chores/executions/calculate-next-assignments`,
      });
    },
  };
}
