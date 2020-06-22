import { Injectable } from '@angular/core';
import { ClientRequestService } from './client-request.service';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { StorageService } from './storage.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private clientRequest: ClientRequestService,
    private storage: StorageService
  ) {}

  getAllUsers() {
    /*     const token = this.storage.get('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` }); */
    return this.clientRequest.get(`${environment.urlEndPoint}/usuario`);
  }

  getOneUser(id) {
    return this.clientRequest.get(`${environment.urlEndPoint}/usuario/${id}`);
  }

  insertUser(user: User) {
    /*     const token = this.storage.get('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` }); */
    return this.clientRequest.post(`${environment.urlEndPoint}/usuario`, user);
  }

  deleteUser(id: string) {
    return this.clientRequest.delete(
      `${environment.urlEndPoint}/usuario/${id}`
    );
  }

  updateUser(id: string, user: User) {
    return this.clientRequest.put(
      `${environment.urlEndPoint}/usuario/${id}`,
      user
    );
  }
}
