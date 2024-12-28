export type EntityTypes =
  | "batteries"
  | "chores"
  | "chores_log"
  | "equipment"
  | "locations"
  | "meal_plan"
  | "meal_plan_sections"
  | "product_barcodes"
  | "product_groups"
  | "products"
  | "products_average_price"
  | "products_last_purchased"
  | "quantity_unit_conversions"
  | "quantity_unit_conversions_resolved"
  | "quantity_units"
  | "recipes"
  | "recipes_nestings"
  | "recipes_pos"
  | "recipes_pos_resolved"
  | "shopping_list"
  | "shopping_lists"
  | "shopping_locations"
  | "stock"
  | "stock_current_locations"
  | "stock_log"
  | "task_categories"
  | "tasks"
  | "userentities"
  | "userfields"
  | "userobjects";

export type UserFieldTypes =
  | "api_keys"
  | "batteries"
  | "chores"
  | "chores_log"
  | "equipment"
  | "locations"
  | "meal_plan"
  | "meal_plan_sections"
  | "product_barcodes"
  | "product_groups"
  | "products"
  | "products_average_price"
  | "products_last_purchased"
  | "quantity_unit_conversions"
  | "quantity_unit_conversions_resolved"
  | "quantity_units"
  | "recipes"
  | "recipes_nestings"
  | "recipes_pos"
  | "recipes_pos_resolved"
  | "shopping_list"
  | "shopping_lists"
  | "shopping_locations"
  | "stock"
  | "stock_current_locations"
  | "stock_log"
  | "task_categories"
  | "tasks"
  | "userentities"
  | "userfields"
  | "userobjects"
  | "users";

export interface GrocyEntity {
  default_best_before_days: string;
  default_best_before_days_after_open: string;
  default_consume_location_id: string;
  description: null;
  enable_tare_weight_handling: string;
  id: string;
  location_id: string;
  min_stock_amount: string;
  move_on_open: string;
  name: string;
  not_check_stock_fulfillment_for_recipes: string;
  picture_file_name: string;
  product_group_id: string;
  qu_id_purchase: string;
  qu_id_stock: string;
  row_created_timestamp: Date;
  shopping_location_id: null;
  should_not_be_frozen: string;
  tare_weight: string;
  userfields: null;
}