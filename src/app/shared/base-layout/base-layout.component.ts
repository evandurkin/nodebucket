/*
=======================================
// Title: Nodebucket Application
// Author: Evan Durkin
// Date: March 27, 2022
// Description: Base Layout component
=======================================
*/


import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css']
})
export class BaseLayoutComponent implements OnInit {

  year: number = Date.now();
  isLoggedIn: boolean;
  name: string;

  constructor(private cookieService: CookieService, private router: Router) {
    this.isLoggedIn = this.cookieService.get("session_user") ? true : false;
    console.log("isLoggedIn: " + this.isLoggedIn);
  }


  ngOnInit(): void {
    this.name = sessionStorage.getItem("name");
    console.log("logged in user name " + this.name);
  }

  //signs user out and redirects to signin page
  signOut() {
    this.cookieService.deleteAll();
    this.router.navigate(['/session/signin']);
  }

}
