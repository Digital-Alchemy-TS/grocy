export interface GrocyChoreDetails {
  chore: Chore;
  last_done_by: LastDoneBy;
  last_tracked: Date;
  next_estimated_execution_time: Date;
  track_count: number;
}

export interface Chore {
  description: string;
  id: number;
  name: string;
  period_days: number;
  period_type: string;
  row_created_timestamp: Date;
}

export interface LastDoneBy {
  display_name: string;
  first_name: string;
  id: number;
  last_name: string;
  row_created_timestamp: Date;
  username: string;
}

export interface ChoreItem {
  chore_id: number;
  id: number;
}
export interface GrocyChore {
  chore_id: number;
  chore_name: string;
  id: number;
  is_reassigned: number;
  is_rescheduled: number;
  last_tracked_time: Date;
  next_estimated_execution_time: Date;
  next_execution_assigned_to_user_id: number;
  next_execution_assigned_user: NextExecutionAssignedUser;
  track_date_only: number;
}

export type GrocyChorePeriodType = "daily";
export type GrocyChoreAssignmentType = "in-alphabetical-order";

export interface GrocyObjectChoreDetail<USERFIELDS extends object = object> {
  assignment_config: string;
  assignment_type: GrocyChoreAssignmentType;
  consume_product_on_execution: boolean;
  description: string;
  id: number;
  name: string;
  next_execution_assigned_to_user_id: number;
  period_days?: number;
  period_interval: number;
  period_type: GrocyChorePeriodType;
  product_amount: number | null;
  product_id: number | null;
  rescheduled_date: Date | null;
  rescheduled_next_execution_assigned_to_user_id: number | null;
  rollover: boolean;
  row_created_timestamp: Date;
  start_date: Date;
  userfields: USERFIELDS;
}

export interface NextExecutionAssignedUser {
  display_name: string;
  first_name: string;
  id: number;
  last_name: string;
  picture_file_name: null;
  row_created_timestamp: Date;
  username: string;
}
