/*
=======================================
// Title: Nodebucket Application
// Author: Evan Durkin
// Date: April 3, 2022
// Description: Create Task component
=======================================
*/

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  taskForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<CreateTaskComponent>,
    private fb: FormBuilder
  ) { }


  ngOnInit(): void {
    this.taskForm = this.fb.group({
      text: [null, Validators.compose([Validators.required])]
    })
  }

  //submits the user data to the form to add a new task
  createTask() {
    this.dialogRef.close(this.taskForm.value);
  }

  // cancel button to close the createTask dialog
  cancel() {
    this.dialogRef.close
  }

}
