import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

import { Error } from '../../interfaces/error';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(catchError((error: HttpErrorResponse) => {
      let errorMessage = <Error>{};
      if (error.error instanceof ErrorEvent) {
        console.log('Client-side error:');
        // Client-side error
        errorMessage = { name: "client error", status: 0, message: "An error occurred on the client side" };
      } else {
        // Server-side error
        errorMessage = { name: error.name, status: error.status, message: `Error ${error.message}` };
      }
      return throwError(() => errorMessage);
    }))
};
