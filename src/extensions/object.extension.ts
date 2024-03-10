import { TServiceParams } from "@digital-alchemy/core";

import { EntityTypes, GrocyEntity, UserFieldTypes } from "../helpers";

type GrocyCreateObject = {
  body: GrocyEntity;
  type: EntityTypes;
};

type GrocyGetObject = {
  id: number;
  type: GrocyEntity;
};

type GrocyDeleteObject = GrocyGetObject;
type GrocyGetObjectUserfields = {
  id: string;
  type: UserFieldTypes;
};

type GrocyUpdateObject = {
  body: GrocyEntity;
  id: string;
  type: GrocyEntity;
};

export function ObjectExtension({ logger, grocy }: TServiceParams) {
  return {
    async createObject({ type, body }: GrocyCreateObject) {
      logger.trace("createObject");
      return await grocy.fetch({
        body: { ...body },
        method: "post",
        url: `/objects/${type}`,
      });
    },

    async deleteObject({ id, type }: GrocyDeleteObject) {
      logger.trace("deleteObject");
      return await grocy.fetch({
        method: "delete",
        url: `/objects/${type}/${id}`,
      });
    },

    async getObject({ id, type }: GrocyGetObject) {
      logger.trace("getObject");
      return await grocy.fetch({
        url: `/objects/${type}/${id}`,
      });
    },

    async listObjectUserFields<T>({
      id,
      type,
    }: GrocyGetObjectUserfields): Promise<T> {
      logger.trace("listObjectUserFields");
      return await grocy.fetch({
        url: `/userfields/${type}/${id}`,
      });
    },

    async listObjects(entity: EntityTypes) {
      logger.trace("listObjects");
      return await grocy.fetch({
        url: `/objects/${entity}`,
      });
    },

    async updateObject({ type, id, body }: GrocyUpdateObject) {
      logger.trace("updateObject");
      return await grocy.fetch({
        body: { ...body },
        method: "put",
        url: `/objects/${type}/${id}`,
      });
    },
  };
}
