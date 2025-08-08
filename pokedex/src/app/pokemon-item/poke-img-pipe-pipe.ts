import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pokeImgPipe',
  standalone: true
})
export class PokeImgPipePipe implements PipeTransform {

  transform(url:string):string {
    const parts = url.split('/');
    const id = parts[parts.length - 2]; // El ID está en la penúltima posición
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  }

}
