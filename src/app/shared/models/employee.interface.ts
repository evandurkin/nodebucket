/*
=====================================================
// Title: Nodebucket Application
// Author: Evan Durkin
// Date: April 3, 2022
// Description: Employee Model Interface
=====================================================
*/

import { Item } from "./item.interface";

export interface Employee {
  empId: string;
  toDo: Item[];
  done: Item[];
}
