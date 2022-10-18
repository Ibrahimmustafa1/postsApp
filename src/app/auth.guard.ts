import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { ActivatedRoute, CanActivate, Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService,private router: Router) { }
  canActivate(): any {
    if (this.userService.isAuth.value) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;

  }
}
