import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {
  CanActivate,
  CanActivateChild,
  CanLoad,
  Router,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private readonly auth: AuthService,
    private readonly router: Router
  ) {}

  canActivate(): boolean {
    return true;
  }
  canActivateChild(): boolean {
    return true;
  }
  canLoad(): boolean {
    if (this.auth.isLogged()) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}
