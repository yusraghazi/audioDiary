import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "./services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class ExpenseGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

  // @ts-ignore
  checkLogin(url: string): true | UrlTree {
    console.log("Url: " + url)
    let val: string = localStorage.getItem('isUserLoggedIn');

    if(val != null && val == "true"){
      if(url == "/login")
        this.router.parseUrl('/expenses');
      else
        return true;
    } else {
      return this.router.parseUrl('/login');
    }
  }
}
