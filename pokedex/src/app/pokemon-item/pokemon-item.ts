import { Component, Input, input } from '@angular/core';
import { PokeListResult } from '../models/poke-list-model';
import { TitleCasePipe } from '@angular/common';
import { PokeImgPipePipe } from './poke-img-pipe-pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'poke-pokemon-item',
  imports: [TitleCasePipe, PokeImgPipePipe, RouterLink],
  templateUrl: './pokemon-item.html',
  styleUrl: './pokemon-item.css'
})
export class PokemonItem {

  // con el input esto es un signal que se actualiza automáticamente
  readonly pokemonItem = input.required<PokeListResult>();

  // Con el decorador input, en el html ya no se usa los () para acceder a las propiedades
  // como se hace con los signals
  //@Input() pokemonItem!: PokeListResult;
}
