export interface GrocyTask {
  assigned_to_user: AssignedToUser;
  assigned_to_user_id: number;
  category: Category;
  category_id: number;
  description: null;
  done: number;
  done_timestamp: null;
  due_date: null;
  id: number;
  name: string;
  row_created_timestamp: Date;
  userfields?: GrocyTaskUserfields;
}

export interface AssignedToUser {
  display_name: string;
  first_name: string;
  id: number;
  last_name: string;
  picture_file_name: null;
  row_created_timestamp: Date;
  username: string;
}

export interface Category {
  active: number;
  description: null;
  id: number;
  name: string;
  row_created_timestamp: Date;
}

export interface GrocyTaskUserfields {
  //
}
