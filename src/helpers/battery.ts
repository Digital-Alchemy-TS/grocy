export interface GrocyBattery {
  battery: Battery;
  battery_id: number;
  id: number;
  last_tracked_time: Date;
  next_estimated_charge_time: Date;
}

export interface Battery {
  active: number;
  charge_interval_days: number;
  description: null;
  id: number;
  name: string;
  row_created_timestamp: Date;
  used_in: null;
}
