import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AutenticacionService {
  private isUserAuthenticated = false;

  private onChangeStatusUser = new Subject();

  constructor() {}

  login(usuario) {
    this.isUserAuthenticated = true;
    this.onChangeStatusUser.next(true);
    sessionStorage.setItem('userLogged', 'true');
  }

  logout() {
    this.isUserAuthenticated = false;
    this.onChangeStatusUser.next(false);
    sessionStorage.clear();
  }

  changeStatus() {
    return this.onChangeStatusUser.asObservable();
  }

  isUserLogged() {
    const existsUserLogged = sessionStorage.getItem('userLogged');

    if (this.isUserAuthenticated || existsUserLogged) {
      return true;
    }

    return false;
  }
}
