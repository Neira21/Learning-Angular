import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, catchError, map, finalize } from 'rxjs/operators';


export interface RolesResponse{
  success: boolean;
  data: Role[];
}

export interface Role {
  id: number;
  nombre: string;
}

export interface ErrorResponse {
  success: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private API_URL = 'http://localhost:4000/api/v1';
  http = inject(HttpClient);
  isLoading = signal<boolean>(false);
  isError = signal<boolean>(false);

  getRoles(): Observable<RolesResponse> {
    this.isLoading.set(true);
    return this.http.get<RolesResponse>(`${this.API_URL}/roles`).pipe(
      // consolear respuesta
      map(response => {
        console.log('Roles obtenidos:', response);
        this.isError.set(false);
        this.isLoading.set(false);
        return response;
      }),
      catchError((error: ErrorResponse) => {
        console.error('Error fetching roles:', error);
        this.isLoading.set(false);
        this.isError.set(true);
        return throwError(() => new Error('Error fetching roles'));
      }),
    )
  }


}
