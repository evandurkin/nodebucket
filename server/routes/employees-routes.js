/*
==========================================================
// Title: Nodebucket Application
// Author: Evan Durkin
// Date: April 9, 2022
// Description: Route setup for the employee tasks and create,
//              find all, and delete
==========================================================
*/

// require and router
const express = require("express");
const Employee = require("../models/employee");
const router = express.Router();
const BaseResponse = require("../models/base-response");

// FindEmployeeById
router.get("/:empId", async (req, res) => {
  //adds id to '/api/employees'
  try {
    Employee.findOne({ empId: req.params.empId }, function (err, employee) {
      //find one ID with parameters in url
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
    Employee.findOne(
      { empId: req.params.empId }, // finds employee by ID to add task to
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
        }
      }
    );
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: `Internal server error: ` + e.message,
    });
  }
});

// updateTask after drag-and-drops
router.put("/:empId/tasks", async (req, res) => {
  // finds the employee by ID and then calls the toDo and done
  try {
    Employee.findOne({ empId: req.params.empId }, function (err, employee) {
      if (err) {
        console.log(err);
        const updatedTaskMongoErrorResponse = new BaseResponse(
          "501",
          "MongoDb Server Error",
          err
        );
        res.status(501).send(updatedTaskMongoErrorResponse.toObject());
      } else {
        console.log(employee);
        employee.set({
          toDo: req.body.toDo,
          done: req.body.done,
        });

        employee.save(function (err, updatedEmployee) {
          // saves the updated employee and displays new arrays
          if (err) {
            console.log(err);
            const updateTaskOnSaveMongoErrorResponse = new BaseResponse(
              "500",
              "MongoDB Server Error",
              err
            );
            res.status(500).send(updateTaskOnSaveMongoErrorResponse.toObject());
          } else {
            console.log(updatedEmployee);
            const updatedTaskOnSuccessResponse = new BaseResponse(
              "200",
              "Update Successful",
              updatedEmployee
            );
            res.json(updatedTaskOnSuccessResponse.toObject());
          }
        });
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send(updateTaskOnSaveMongoErrorResponse.toObject());
  }
});

router.delete("/:empId/tasks/:taskId", async (req, res) => {
  try {
    Employee.findOne({ empId: req.params.empId }, function (err, employee) {
      if (err) {
        console.log(err);
        const deleteTaskMongoErrorResponse = new BaseResponse(
          "501",
          "MongoDB Server Error",
          err
        );
        res.status(501).send(deleteTaskMongoErrorResponse.toObject());
      } else {
        console.log(employee);
        const toDoItem = employee.toDo.find(
          (item) => item._id.toString() === req.params.taskId
        );
        const doneItem = employee.done.find(
          (item) => item._id.toString() === req.params.taskId
        );

        if (toDoItem) {
          employee.toDo.id(toDoItem._id).remove();
          employee.save(function (err, updatedToDoItemEmployee) {
            if (err) {
              console.log(err);
              const deleteToDoItemMongoErrorResponse = new BaseResponse(
                "501",
                "MongoDB Server Error",
                err
              );
              res.status(501).send(deleteToDoItemMongoErrorResponse.toObject());
            } else {
              console.log(updatedToDoItemEmployee);
              const deleteToDoItemOnSuccessResponse = new BaseResponse(
                "200",
                "Removed item from the ToDo List",
                updatedToDoItemEmployee
              );
              res.json(deleteToDoItemOnSuccessResponse.toObject());
            }
          });
        } else if (doneItem) {
          employee.done.id(doneItem._id).remove();
          employee.save(function (err, updatedDoneItemEmployee) {
            if (err) {
              console.log(err);
              res
                .status(500)
                .send(updateTaskOnSaveMongoErrorResponse.toObject());
            } else {
              console.log(updatedDoneItemEmployee);
              res.json(updatedDoneItemEmployee.toObject());
            }
          });
        } else {
          console.log("Invalid ID: " + req.params.taskId);
          const deleteTaskNotFoundResponse = new BaseResponse(
            "300",
            "Invalid taskId",
            req.params.taskId
          );
          res.status(300).send(deleteTaskNotFoundResponse.toObject());
        }
      }
    });
  } catch (e) {
    console.log(e);
    const deleteTaskCatchErrorResponse = new BaseResponse(
      "500",
      "Internal Server Error",
      e
    );
    res.status(500).send(deleteTaskCatchErrorResponse.toObject());
  }
});

module.exports = router;
