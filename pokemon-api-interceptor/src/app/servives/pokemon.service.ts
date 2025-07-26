import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { iresponse } from '../interfaces/results';
import { catchError, Observable, throwError } from 'rxjs';
import { Error } from '../interfaces/error';



@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  // url desde environment
  private apiUrl = environment.apiUrl;
  http = inject(HttpClient);
  getPokemonList():Observable<iresponse> {
    return this.http.get<iresponse>(`${this.apiUrl}/pokemon?limit=10&&offset=0`)
  }
}
