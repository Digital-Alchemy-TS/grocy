import { CreateLibrary, SECOND } from "@digital-alchemy/core";

import {
  Aggregator,
  BatteryExtension,
  Chores,
  FetchInternals,
  GrocyFetch,
  Misc,
  ObjectExtension,
  Recipe,
  Stock,
  System,
  Tasks,
  User,
} from "./extensions";

export const LIB_GROCY = CreateLibrary({
  configuration: {
    API_KEY: {
      description: "API Key",
      required: true,
      type: "string",
    },
    BASE_URL: {
      description: "Grocy API Base URL",
      required: true,
      type: "string",
    },
    POLL_INTERVAL: {
      default: 5 * SECOND,
      type: "number",
    },
    USERFIELDS_FETCH_RATE: {
      default: 10,
      type: "number",
    },
  },
  name: "grocy",
  priorityInit: [],
  services: {
    aggregator: Aggregator,
    battery: BatteryExtension,
    chores: Chores,
    fetch: GrocyFetch,
    internal: FetchInternals,
    misc: Misc,
    object: ObjectExtension,
    recipe: Recipe,
    stock: Stock,
    system: System,
    tasks: Tasks,
    user: User,
  },
});

declare module "@digital-alchemy/core" {
  export interface LoadedModules {
    grocy: typeof LIB_GROCY;
  }
}
