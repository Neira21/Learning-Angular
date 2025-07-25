import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { iresponse } from '../interfaces/results';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  // url desde environment
  private apiUrl = environment.apiUrl;
  http = inject(HttpClient);
  getPokemonList():Observable<iresponse> {
    return this.http.get<iresponse>(`${this.apiUrl}/asdasd/pokemon?limit=10&offset=0`).pipe(catchError((error: HttpErrorResponse) => {
      let errorMessage = "";
      if (error.error instanceof ErrorEvent) {
        // Client-side error
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // Server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      return throwError(() => errorMessage);
    }))
  }
}
