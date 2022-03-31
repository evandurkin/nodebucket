/*
===================================================
// Title: Nodebucket Application
// Author: Evan Durkin
// Date: March 30, 2022
// Description: Mongoose model for Employee schema
===================================================
*/

// require variables
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const itemSchema = require("./item");

// Employee Schema requiring id, first and last name and items
const employeeSchema = new Schema(
  {
    empId: { type: String, unique: true },
    firstName: { type: String },
    lastName: { type: String },
    toDo: [itemSchema],
    done: [itemSchema],
  },
  { collection: "employees" }
);

let Employee = mongoose.model("Employee", employeeSchema);

// exports employee schema
module.exports = Employee;
module.exports = mongoose.model("Employee", employeeSchema);
