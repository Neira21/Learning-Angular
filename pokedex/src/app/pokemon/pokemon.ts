import { Component, inject, OnInit, effect } from '@angular/core';
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

  // console de la data que trae

  constructor(){
    effect(() => {
      console.log('🔄 Pokemon Resource State:');
      console.log('  📊 Value:', this.pokemonList.value());
      console.log('  ⏳ Loading:', this.pokemonList.isLoading());
      console.log('  ❌ Error:', this.pokemonList.error());

      // Si hay datos, mostrar estructura
      const data = this.pokemonList.value();
      if (data) {
        console.log('  🎯 Pokemon Count:', data.results.length);
        console.log('  🎯 First Pokemon:', data.results[0]);
      }
    });
  }


}
