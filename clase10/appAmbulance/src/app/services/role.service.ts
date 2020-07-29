import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../models/role.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { pluck } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  constructor(private http: HttpClient) {}

  list(): Observable<Role[]> {
    return this.http
      .get<Role[]>(`${environment.pathAPI}/role`)
      .pipe(pluck('result'));
  }
}
