import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  list(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.pathAPI}/user`);
  }

  listOne() {}

  listByPage(
    pageCurrent: number,
    sort: string,
    direction: number
  ): Observable<any> {
    return this.http.post(`${environment.pathAPI}/user/page/${pageCurrent}`, {
      sort,
      direction,
    });
  }

  insert() {}

  update() {}

  delete() {}
}
