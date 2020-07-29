import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '../../environments/environment';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  socket: SocketIOClient.Socket;

  constructor() {
    this.socket = io.connect(environment.urlSocket);
  }

  listen(eventName: string): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this.socket.on(eventName, (result) => observer.next(result));
    });
  }
}
