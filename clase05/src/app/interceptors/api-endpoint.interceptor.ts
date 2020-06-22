import {
  HttpInterceptor,
  HttpEvent,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiEndpointInterceptor implements HttpInterceptor {
  constructor(private storage: StorageService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.startsWith('/receta')) {
      return next.handle(req);
    } else {
      const token = this.storage.get('token');

      const cloneRequest: HttpRequest<any> = req.clone({
        headers: req.headers.append('Authorization', `Bearer ${token}`),
      });

      return next.handle(cloneRequest);
    }
  }
}
