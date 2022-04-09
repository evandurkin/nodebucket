/*
==========================================================
// Title: Nodebucket Application
// Author: Evan Durkin
// Date: March 27, 2022
// Description: Home page
==========================================================
*/

import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/shared/models/employee.interface';
import { Item } from 'src/app/shared/models/item.interface';
import { CookieService } from 'ngx-cookie-service';
import { TaskService } from 'src/app/shared/services/task.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskComponent } from 'src/app/shared/create-task/create-task.component';
import { CdkDragDrop, DragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // Employee fields variables
  employee: Employee;
  toDo: Item[];
  done: Item[];
  empId: string;

  constructor(
    private taskService: TaskService,
    private cookieService: CookieService,
    private dialog: MatDialog) {
      this.empId = this.cookieService.get("session_user")

      this.taskService.findAllTasks(this.empId).subscribe(res => {
        console.log("server response from findAllTasks");
        console.log(res);

        this.employee = res;
        console.log("EMPLOYEE OBJECT");
        console.log(this.employee);
      }, err => {
        console.log("SERVER ERROR");
        console.log(err);
      }, () => {
        this.toDo = this.employee.toDo;
        console.log("TODO TASKS")
        console.log(this.toDo);

        this.done = this.employee.done;
        console.log("DONE TASKS");
        console.log(this.done);
      })
     }

  ngOnInit(): void {
  }

  // Opens the createTask component screen for user data input
  openCreateTaskDialog() {
    const dialogRef = this.dialog.open(CreateTaskComponent, {
      disableClose: true
    })
    // after user closes dialog, the data is used to create a task
    dialogRef.afterClosed().subscribe(data => {
      if(data) {
        this.taskService.createTask(this.empId, data.text).subscribe(res => {
          this.employee = res;
        }, err => {
          console.log("Server Error");
          console.log(err);
        }, () => {
          this.toDo = this.employee.toDo;
          this.done = this.employee.done;
        })
        }
      })
    }

  // drag and drop for To-Do and Done task cards
  drop(event: CdkDragDrop<any[]>) {
    if(event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

      console.log(`Reordered the existing list of task items`);

      this.updateTaskList(this.empId, this.toDo, this.done);
    } else {
      transferArrayItem (event.previousContainer.data,
                          event.container.data,
                          event.previousIndex,
                          event.currentIndex);

                          console.log(`Moved task item to the container`);

                          this.updateTaskList(this.empId, this.toDo, this.done);
    }
  }

  // update the task lists
  updateTaskList(empId: string, toDo: Item[], done: Item[]): void {
    this.taskService.updateTask(empId, toDo, done).subscribe(res => {
      this.employee = res.data;
    }, err => {
      console.log(err)
    }, () => {
      this.toDo = this.employee.toDo;
      this.done = this.employee.done;
    })
  }

  // delete a task by the taskId
  deleteTask(taskId: string) {
    if(confirm(`Are you sure you want to delete this task?`)) {
      if(taskId) {
        console.log(`Task item: ${taskId} was deleted`);

        this.taskService.deleteTask(this.empId, taskId).subscribe(res => {
          this.employee = res.data;
        }, err => {
          console.log(err);
        }, () => {
          this.toDo = this.employee.toDo;
          this.done = this.employee.done;
        })
      }
    }
  }
  }
