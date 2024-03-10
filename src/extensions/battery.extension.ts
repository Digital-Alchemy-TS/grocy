import { TServiceParams } from "@digital-alchemy/core";

import { Battery, GrocyBattery } from "../helpers";

interface GrocyBatteryResponse {
  battery: Battery;
  battery_id: number;
  id: number;
  last_tracked_time: string;
  next_estimated_charge_time: string;
}

export function BatteryExtension({ grocy, logger }: TServiceParams) {
  return {
    async listBatteries(): Promise<GrocyBattery[]> {
      logger.trace("listBatteries");
      const list = await grocy.fetch<GrocyBatteryResponse[]>({
        url: "/batteries",
      });
      return list.map(i => ({
        ...i,
        last_tracked_time: i.last_tracked_time
          ? new Date(i.last_tracked_time.replace(" ", "T") + ".000Z")
          : undefined,
        next_estimated_charge_time: i.next_estimated_charge_time
          ? new Date(i.next_estimated_charge_time.replace(" ", "T") + ".000Z")
          : undefined,
      }));
    },
  };
}
