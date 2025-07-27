import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

import { iresponse } from '../interfaces/results';
import { Observable } from 'rxjs';




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

  getPokemonByName(name:string): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/pokemon/${name}`)
  }
}
