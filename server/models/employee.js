/*
===================================================
// Title: Nodebucket Application
// Author: Evan Durkin
// Date: April 3, 2022
// Description: Mongoose model for Employee schema
===================================================
*/

// require variables
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const itemSchema = require("./item");

// Employee Schema requiring id, first and last name and item schema
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

// exports employee schema
module.exports = mongoose.model("Employee", employeeSchema);
