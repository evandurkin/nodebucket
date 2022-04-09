/*
===================================================
// Title: Nodebucket Application
// Author: Evan Durkin
// Date: April 2, 2022
// Description: Routes for Angular component pages
===================================================
*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../models/item.interface';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  // finds all tasks associated with the signed-in employee ID
  findAllTasks(empId: string): Observable<any> {
    return this.http.get("/api/employees/" + empId + "/tasks");
  }

  // creates a new task and pushes to the employee ID
  createTask(empId: string, task: string): Observable<any> {
    return this.http.post("/api/employees/" + empId + "/tasks", {
      text: task
    })
  }

  // update the list of tasks after changes
  updateTask(empId: string, toDo: Item[], done: Item[]): Observable<any> {
    return this.http.put('/api/employees/' + empId + '/tasks', {
      toDo, done
    })
  }

  // delete a task
  deleteTask(empId: string, taskId: string): Observable<any> {
    return this.http.delete('/api/employees/' + empId + '/tasks/' + taskId)
  }
}
