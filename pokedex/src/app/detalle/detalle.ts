
import { Component, input, inject } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'poke-detalle',
  imports: [TitleCasePipe, RouterLink],
  templateUrl: './detalle.html',
  styleUrl: './detalle.css'
})
export default class Detalle {
  readonly name = input<string>('');

  readonly pokemonService = inject(PokemonService)

  protected readonly pokemonDetalle = this.pokemonService.getPokemonDetail(this.name);

}
