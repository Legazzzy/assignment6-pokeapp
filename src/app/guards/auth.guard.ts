import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { StorageUtil } from '../utils/storage.util';

@Injectable({
  providedIn: 'root'
})
/** Guard component used to regulate page navigation access */
export class AuthGuard implements CanActivate {

  /** Constructor, creates an instance of Router and UserService */
  constructor(
    private readonly router:Router,
    private readonly userService: UserService
  ) {}

  /** Method used to define a users page access rights */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.userService.user) {
      return true;
    } else {
      this.router.navigateByUrl("/login");
      return false;
    }
  }
  
}
