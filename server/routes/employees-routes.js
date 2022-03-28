/*
==========================================================
// Title: Nodebucket Application
// Author: Evan Durkin
// Date: March 27, 2022
// Description: Route setup for the FindEmployeeById route
==========================================================
*/

// require and router
const express = require("express");
const Employee = require("../models/employee");
const router = express.Router();

// FindEmployeeById
router.get("/:empId", async (req, res) => {
  //adds id to '/api/employees'
  try {
    Employee.findOne({ empId: req.params.empId }, function (err, employee) {
      //find one ID with parameturs in url
      if (err) {
        res.status(500).send({
          message: `Error. Invalid ID`, //sends error message if ID is incorrect
        });
      } else {
        console.log(employee);
        res.json(employee); //returns employee if ID is valid
      }
    });
  } catch (e) {
    res.status(500).send({
      message: `Server Error`,
    });
  }
});

module.exports = router;
