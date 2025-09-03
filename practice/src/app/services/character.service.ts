import { Injectable, signal } from '@angular/core';
import { CharacterExample } from '@app/types/character';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  state = signal({
    characters: new Map<number, CharacterExample>(),
  });

  constructor() {
    this.getCharacters();
  }

  getFormattedCharacters(): CharacterExample[] {
    return Array.from(this.state().characters.values());
  }

  getCharacterById(id: number) {
    return this.state().characters.get(id);
  }

  getCharacters(): void {
    const mockCharacter: CharacterExample[] = [
      { id: 1, name: 'Character 1', lastName: 'lastName 1', age: 20 },
      { id: 2, name: 'Character 2', lastName: 'lastName 2', age: 25 },
      { id: 3, name: 'Character 3', lastName: 'lastName 3', age: 30 },
    ];

    of(mockCharacter).subscribe((result) => {
      result.forEach((character) =>
        this.state().characters.set(character.id, character)
      );

      this.state.set({ characters: this.state().characters });
    });
  }

  updateCharacter(character: CharacterExample): void {
    const updateCharacter = { ...character };
    of(updateCharacter).subscribe((result) => {
      this.state.update((state) => {
        state.characters.set(result.id, result);
        return { characters: state.characters };
      });
    });
  }

  deleteCharacter(id: number): void {
    of({ status: 200 }).subscribe((result) => {
      this.state.update((state) => {
        state.characters.delete(id);
        return { characters: state.characters };
      });
    });
  }
}
