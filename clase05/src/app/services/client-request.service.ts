import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ClientRequestService {
  constructor(private readonly http: HttpClient) {}

  post(urlEndPoint, data) {
    return this.http.post(urlEndPoint, data).toPromise();
  }

  get(urlEndPoint) {
    return this.http.get(urlEndPoint).toPromise();
  }

  delete(urlEndPoint) {
    return this.http.delete(urlEndPoint).toPromise();
  }

  put(urlEndPoint, data) {
    return this.http.put(urlEndPoint, data).toPromise();
  }
}
