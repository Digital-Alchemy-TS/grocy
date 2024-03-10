import { Gauge } from "prom-client";

export const GROCY_REBUILD_CACHE = new Gauge({
  help: "Timestamps for rebuilding the grocy cache",
  name: "grocy_rebuild_cache",
});
