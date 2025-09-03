import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { characterAdapter } from '@app/adapters/character-adapter';
import { Character, response } from '@app/types/character';
import { catchError, map, Observable, of } from 'rxjs';

// Diferencia entre una promise y un observable?
// promise ➡️ promete que algo suscede termine bien o mal
// obserbable ➡️ es un canal de comunicación, se obserban el contenido que pasa por el canal

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiUrl = 'https://rickandmortyapi.com/api';
  http = inject(HttpClient);

  getUsers(): Observable<response> {
    return this.http.get<response>(`${this.apiUrl}/character`).pipe(
      map((response) => ({
        ...response,
        results: characterAdapter(response.results),
      }))
    );
  }

  getUserByName(name: string): Observable<Character | undefined> {
    return this.http.get<Character | undefined>(
      `${this.apiUrl}/character/?name=${name}`
    );
  }

  updateCharacter(character: Character): Observable<Character> {
    return this.http.put<Character>(
      `${this.apiUrl}/character/${character.id}`,
      character
    );
  }
  deleteCharacter(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/character/${id}`);
  }
}
