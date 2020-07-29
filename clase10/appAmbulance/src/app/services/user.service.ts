import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
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

  insert(dataForm: FormData): Observable<any> {
    return this.http.post(`${environment.pathAPI}/user`, dataForm);
  }

  // tslint:disable-next-line: variable-name
  update(_id: string, dataForm: FormData): Observable<any> {
    const request = new HttpRequest(
      'put',
      `${environment.pathAPI}/user/${_id}`,
      dataForm,
      {
        reportProgress: true,
      }
    );

    return this.http.request(request);

    /*     return this.http.put(`${environment.pathAPI}/user/${_id}`, dataForm); */
  }

  // tslint:disable-next-line: variable-name
  delete(_id: string): Observable<any> {
    return this.http.delete(`${environment.pathAPI}/user/${_id}`);
  }

  getUrlPhoto(photo: string): string {
    if (!photo) {
      return '';
    }

    return `${environment.pathAPI}/files/${photo}`;
  }
}
