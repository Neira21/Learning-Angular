import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagePoke',
})
export class ImagePokePipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    const parts = value.split('/');
    const id = parts[parts.length - 2];
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  }
}
