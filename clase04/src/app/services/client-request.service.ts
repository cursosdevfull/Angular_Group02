import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class ClientRequestService {
  constructor(private readonly http: HttpClient) {}

  post(urlEndPoint, data, headers = {}) {
    // return axios.post(urlEndPoint, data, { headers });
    /*     return fetch(urlEndPoint, {
      method: 'POST',
      headers,
    }).then((res) => res.json()); */
    return this.http.post(urlEndPoint, data, { headers }).toPromise();
  }

  /*   HttpClient
  axios
  fetch
  XMLHttpRequest */
}
