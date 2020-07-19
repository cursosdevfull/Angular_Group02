import { Injectable, ErrorHandler } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class ErrorService implements ErrorHandler {
  constructor(private router: Router) {}

  handleError(error: Error | HttpErrorResponse): void {
    if (error instanceof HttpErrorResponse) {
      console.log(error);
    } else {
      if (environment.name !== 'development') {
        console.log(error);
      } else {
        if (navigator.onLine && error.name) {
          this.router.navigate(['/error'], {
            queryParams: {
              name: error?.name,
              message: error?.message,
              stack: error?.stack,
            },
          });
        }
      }
    }
  }
}
