import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.interface';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MessageService } from './message.service';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userLogged = false;
  private onChangeStatusUser = new Subject();

  constructor(
    private http: HttpClient,
    private storage: StorageService,
    private router: Router,
    private messageService: MessageService
  ) {}

  login(user: User): void {
    this.http
      .post(`${environment.pathAPI}/auth/login`, user)
      .subscribe((response: { status: number; result: {} }) => {
        this.storage.save('user', JSON.stringify(response.result));
        this.userLogged = true;
        this.onChangeStatusUser.next(true);
        this.router.navigate(['/history']);
      });
  }

  logout(): void {
    this.userLogged = false;
    this.onChangeStatusUser.next(false);
    this.storage.clear();
    this.router.navigate(['/']);
  }

  isUserLogged(): boolean {
    if (this.userLogged || this.storage.getExistsProperty('user')) {
      return true;
    } else {
      return false;
    }
  }

  getStatusUser(): Observable<any> {
    return this.onChangeStatusUser.asObservable();
  }

  getNewAccessToken(): Observable<any> {
    const refreshToken = this.storage.getFieldUser('user', 'refreshToken');
    return this.http.post(`${environment.pathAPI}/auth/new-access-token`, {
      refreshToken,
    });
  }

  getPropertyFieldValue(name: string): string {
    const accessToken = this.storage.getFieldUser('user', 'accessToken');
    const payload = jwt_decode(accessToken);

    return payload.data[name];
  }

  getUrlPhotoUser(): string {
    const photoFile = this.getPropertyFieldValue('photo');

    if (photoFile) {
      return `${environment.pathAPI}/files/${photoFile}`;
    }
    return '';
  }
}
