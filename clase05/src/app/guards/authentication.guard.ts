import { CanActivate, Router, CanActivateChild } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate, CanActivateChild {
  constructor(
    private readonly authentication: AuthenticationService,
    private readonly router: Router
  ) {}

  canActivate(): boolean | Promise<boolean> | Observable<boolean> {
    const isUserAuthenticated = this.authentication.isAuthenticated;

    if (!isUserAuthenticated) {
      this.router.navigate(['/']);
    }

    return isUserAuthenticated;
  }

  canActivateChild(): boolean | Promise<boolean> | Observable<boolean> {
    const isUserAuthenticated = this.authentication.isAuthenticated;

    if (!isUserAuthenticated) {
      this.router.navigate(['/']);
    }

    return isUserAuthenticated;
  }
}
