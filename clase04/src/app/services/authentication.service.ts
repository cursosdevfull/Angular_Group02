import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { ClientRequestService } from './client-request.service';
import { StorageService } from './storage.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  userLogged = false;
  private urlAPI: string;

  private onChangeStatusUser = new Subject();
  private onInvalidCredentials = new Subject();

  constructor(
    private readonly clientRequest: ClientRequestService,
    private readonly storage: StorageService,
    private readonly router: Router
  ) {
    this.urlAPI = environment.urlEndPoint;
  }

  login(user: User) {
    this.clientRequest
      .post(`${this.urlAPI}/usuario/login`, user)
      .then((data: any) => {
        const token = data.result.token;
        this.storage.set('token', token);
        this.userLogged = true;
        this.onChangeStatusUser.next(true);
        this.router.navigate(['user']);
      })
      .catch(() => this.onInvalidCredentials.next(true));
  }

  logout() {
    this.userLogged = false;
    this.onChangeStatusUser.next(false);
    this.storage.clear();
    this.router.navigate(['']);
  }

  get isAuthenticated() {
    const token = this.storage.get('token');

    return this.userLogged || token !== null;
  }

  get observableStatusUser() {
    return this.onChangeStatusUser.asObservable();
  }

  get observableInvalidCredentials() {
    return this.onInvalidCredentials.asObservable();
  }
}
