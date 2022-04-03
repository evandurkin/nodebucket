import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/shared/models/employee.interface';
import { Item } from 'src/app/shared/models/item.interface';
import { SessionUser } from 'src/app/shared/models/session-user.interface';
import { CookieService } from 'ngx-cookie-service';
import { TaskService } from 'src/app/shared/services/task.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskComponent } from 'src/app/shared/create-task/create-task.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

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

  openCreateTaskDialog() {
    const dialogRef = this.dialog.open(CreateTaskComponent, {
      disableClose: true
    })

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
  }
