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

// Find All Tasks
router.get("/:empId/tasks", async (req, res) => {
  // finds all tasks related to employee ID
  try {
    Employee.findOne(
      { empId: req.params.empId },
      "empId toDo done", // uses the employee model to find toDo and done tasks
      function (err, employee) {
        if (err) {
          console.log(err);
          res.status(500).send({
            message: `Internal server error: ` + err.message,
          });
        } else {
          console.log(employee);
          res.json(employee);
        }
      }
    );
  } catch (e) {
    console.log(e);
    res.status(500).send(`Internal server error: ` + e.message);
  }
});

// Create New Task
router.post("/:empId/tasks", async (req, res) => {
  try {
    Employee.findOne({ empId: req.params.empId }), // finds employee by ID to add task to
      function (err, employee) {
        if (err) {
          console.log(err);
          res.status(500).send({
            message: `Internal server error: ` + err.message,
          });
        } else {
          console.log(employee);
          const newItem = {
            // uses the text field from the item schema
            text: req.body.text,
          };
        }

        employee.toDo.push(newItem); // adds the task to the employee tasks

        employee.save(function (err, updatedEmployee) {
          if (err) {
            console.log(err);
            res.status(500).send({
              message: `Internal server error: ` + err.message,
            });
          } else {
            console.log(updatedEmployee);
            res.json(updatedEmployee);
          }
        });
      };
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: `Internal server error: ` + e.message,
    });
  }
});

module.exports = router;
