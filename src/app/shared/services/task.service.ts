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


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  findAllTasks(empId: string): Observable<any> {
    return this.http.get("/api/employees/" + empId + "/tasks");
  }

  createTask(empId: string, task: string): Observable<any> {
    return this.http.post("/api/employees/" + empId + "/tasks", {
      text: task
    })
  }
}
