import { Component, inject } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { PokemonItem } from '../pokemon-item/pokemon-item';

@Component({
  selector: 'poke-pokemon',
  imports: [PokemonItem],
  templateUrl: './pokemon.html',
  styleUrl: './pokemon.css'
})
export class Pokemon {

  // inject service
  readonly pokemonService = inject(PokemonService);

  protected readonly pokemonList = this.pokemonService.getPokemonList();

}
