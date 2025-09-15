import { concatMap, forkJoin, from, map, switchMap, toArray } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

export interface role {
  id: number;
  nombre: string;
}

export interface rolesResponse {
  data: role[];
  succes: boolean;
}

interface roleAdd {
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class userroles {
  private http = inject(HttpClient);

  getRoles() {
    return this.http.get<rolesResponse>('http://localhost:4000/api/v1/roles');
  }

  addRole(name: string) {
    const object = {
      nombre: name,
    };
    return this.http.post<roleAdd>(
      'http://localhost:4000/api/v1/roles',
      object
    );
  }
}
