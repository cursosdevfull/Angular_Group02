import { Injectable } from '@angular/core';
import { User } from '../models/user';
import mock from '../mocks/users.json';
import { Subject, of, Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private mockUsers: User[];
  private userLogged = false;

  private onChangeStatusUser: Subject<boolean> = new Subject<boolean>();

  constructor(
    private readonly storage: StorageService,
    private readonly router: Router
  ) {
    this.mockUsers = mock;
  }

  login(user: User): Observable<any> {
    const userExists = this.mockUsers.filter(
      (mockUser: User) =>
        mockUser.email === user.email.trim().toLowerCase() &&
        mockUser.password === user.password.trim()
    );

    if (userExists.length) {
      return of(userExists[0]).pipe(
        delay(400),
        map((userData: any) => {
          this.storage.save('token', userData.accessToken);
          this.userLogged = true;
          this.onChangeStatusUser.next(true);
          return '';
        })
      );
    } else {
      return of('User not exists');
    }
  }

  logout(): void {
    this.userLogged = false;
    this.onChangeStatusUser.next(false);
    this.storage.clear();
    this.router.navigate(['/']);
  }

  isLogged(): boolean {
    const accessToken = this.storage.retrieve('token');

    if (this.userLogged || accessToken !== null) {
      return true;
    }

    return false;
  }

  changeStatus(): Observable<any> {
    return this.onChangeStatusUser.asObservable();
  }

  getDataUser(propertyUser: string): string {
    const token = this.storage.retrieve('token');
    const payload = jwt_decode(token);

    return payload[propertyUser];
  }
}
