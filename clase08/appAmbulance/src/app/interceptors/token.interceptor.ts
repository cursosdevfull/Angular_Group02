import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry, mergeMap } from 'rxjs/operators';
import { StorageService } from '../services/storage.service';
import { AuthService } from '../services/auth.service';
import { MessageService } from '../services/message.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private storage: StorageService,
    private injector: Injector,
    private messageService: MessageService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const accessToken = this.storage.getFieldUser('user', 'accessToken');

    const requestClone = request.clone({
      headers: request.headers.append('Authorization', `Bearer ${accessToken}`),
    });

    const authService: AuthService = this.injector.get(AuthService);

    return next.handle(requestClone).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
        } else if (error.status === 401) {
          return authService.getNewAccessToken().pipe(
            retry(3),
            mergeMap((response: any) => {
              // tslint:disable-next-line: no-string-literal
              const result = response.result;
              this.storage.save('user', JSON.stringify(result));

              const newAccessToken = this.storage.getFieldUser(
                'user',
                'accessToken'
              );

              const newRequestClone = request.clone({
                headers: request.headers.append(
                  'Authorization',
                  `Bearer ${newAccessToken}`
                ),
              });

              return next.handle(newRequestClone);
            })
          );
        } else if (error.status === 409) {
          authService.logout();
        } else {
          if (error.error && error.error.result) {
            this.messageService.notification(error.error.result);
            return throwError(error.error.result);
          } else {
            if (!navigator.onLine) {
              this.messageService.notification('No internet connection');
              return throwError('No internet connection');
            }
            return throwError(error);
          }
        }
      })
    );
  }
}
