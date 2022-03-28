/*
=======================================
// Title: Nodebucket Application
// Author: Evan Durkin
// Date: March 27, 2022
// Description: Angular Auth Guard
=======================================
*/

// imports for router, guards, and cookie service
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private cookieService: CookieService) {}

  // interface for guard deciding if a route can be activated or not
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const sessionUser = this.cookieService.get('session_user');

      // if the user is validated, access is granted, if not they are returned to sign-in
      if(sessionUser) {
        return true;
      } else {
        this.router.navigate(['/session/signin']);
        return false;
      }
  }

}
