import { TServiceParams } from "@digital-alchemy/core";

import { GrocyUser } from "../helpers";

type EditUser = {
  id: string;
};

type EditUserPermissions = {
  id: string;
};

type AddUserPermissions = {
  id: string;
};

export function User({ logger, lifecycle, grocy }: TServiceParams) {
  lifecycle.onBootstrap(async () => {
    const [self] = await out.currentUser();
    out.CURRENT_USER = self;
  });
  const out = {
    CURRENT_USER: undefined as GrocyUser,

    async addUserPermission({ id }: AddUserPermissions) {
      logger.trace(`addUserPermission`);
      return await grocy.fetch({
        body: {},
        method: "post",
        url: `/users/${id}/permissions`,
      });
    },

    async createUser() {
      logger.trace(`createUser`);
      return await grocy.fetch({
        body: {},
        method: "post",
        url: `/users`,
      });
    },

    async currentUser() {
      logger.trace(`currentUser`);
      return await grocy.fetch<GrocyUser[]>({
        url: `/user`,
      });
    },

    async currentUserAllSettings() {
      logger.trace(`currentUserAllSettings`);
      return await grocy.fetch({
        url: `/user/settings`,
      });
    },

    async currentUserSetting(key: string) {
      logger.trace(`currentUserSetting`);
      return await grocy.fetch({
        url: `/user/settings/${key}`,
      });
    },

    async deleteCurrentUserSetting(key: string) {
      logger.trace(`deleteCurrentUserSetting`);
      return await grocy.fetch({
        method: "delete",
        url: `/user/settings/${key}`,
      });
    },

    async deleteUser(userId: string) {
      logger.trace(`deleteUser`);
      return await grocy.fetch({
        method: "delete",
        url: `/users/${userId}`,
      });
    },

    async editCurrentUserSetting(key: string) {
      logger.trace(`editCurrentUserSetting`);
      return await grocy.fetch({
        method: "put",
        url: `/user/settings/${key}`,
      });
    },

    async editUser({ id }: EditUser) {
      logger.trace(`editUser`);
      return await grocy.fetch({
        body: {},
        method: "put",
        url: `/users/${id}`,
      });
    },

    async editUserPermissions({ id }: EditUserPermissions) {
      logger.trace(`editUserPermissions`);
      return await grocy.fetch({
        body: {},
        method: "put",
        url: `/users/${id}/permissions`,
      });
    },

    async getUserPermissions(userId: string) {
      logger.trace(`getUserPermissions`);
      return await grocy.fetch({
        url: `/users/${userId}/permissions`,
      });
    },

    async listUsers() {
      logger.trace(`listUsers`);
      return await grocy.fetch<GrocyUser[]>({
        url: `/users`,
      });
    },
  };
  return out;
}
