/*
=======================================
// Title: Nodebucket Application
// Author: Evan Durkin
// Date: March 27, 2022
// Description: Sign In Page component
=======================================
*/


// Imports for routing, forms, and cookie service
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signinForm: FormGroup; // uses the angular forms builder
  errorMessage: string; // variable for error message

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private fb: FormBuilder,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.signinForm = this.fb.group({
      empId: [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])] // validates ID
    })
  }

  get form() {
    return this.signinForm.controls;
  }

  // on submit, this validates the session user with the ID and directs them to the home page
  submit(){
    const empId = this.signinForm.controls['empId'].value;

    this.http.get('/api/employees/' + empId).subscribe(res =>
      {
        if (res)
        {
          this.cookieService.set('session_user', empId, 1);
          this.router.navigate(['/']);
        }
        else {
          this.errorMessage = `Invalid ID.`
        }
      })
  }

}
