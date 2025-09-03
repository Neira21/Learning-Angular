import { Character } from '@app/types/character';

export const characterAdapter = (characters: Character[]) => {
  return characters.map((character) => ({
    ...character,
    name: character.name.toUpperCase(),
  }));
};
