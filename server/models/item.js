/*
===================================================
// Title: Nodebucket Application
// Author: Evan Durkin
// Date: March 30, 2022
// Description: Mongoose model for Item schema
===================================================
*/

// require variables
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// schema to define task items as a string
let item = new Schema({
  text: { type: String },
});

module.exports = item;
