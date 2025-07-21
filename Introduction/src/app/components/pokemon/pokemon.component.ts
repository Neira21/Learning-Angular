import { Component } from '@angular/core';

import { MatListItem, MatNavList } from '@angular/material/list';
import { MatButton } from '@angular/material/button';
import { ipokemon } from './models/pokemon.interface';
import { POKEMONS } from './models/constans';
import { PokemondetailsComponent } from './pokemondetails/pokemondetails.component';
import { PokemonmodalComponent } from './pokemonmodal/pokemonmodal.component';

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [MatListItem, MatNavList, MatButton, PokemondetailsComponent, PokemonmodalComponent],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.css',
})
export class PokemonComponent {


  pokemons: ipokemon[] = [...POKEMONS];
  pokemonSelected?: ipokemon;

  clickpokebola(pokemon: ipokemon): void {
    this.pokemonSelected = pokemon;
  }

  clickRestaurar(): void {
    console.log("aca")
    this.pokemons = [...POKEMONS];
  }

  deletePokemon(pokemon: ipokemon): void {
    const index = this.pokemons.indexOf(pokemon);
    if (index > -1) {
      this.pokemons.splice(index, 1);
    }
    this.pokemonSelected = undefined;
  }




















  // pokemons = [...POKEMONS];
  // pokemonSelected?: ipokemon;
  // showModal: boolean = false;

  // toggleModal():void{
  //   this.showModal = !this.showModal;
  // }

  // clickRestaurar(): void {
  //   this.pokemons = [...POKEMONS];
  // }

  // agregarPokemon(pokemon:ipokemon): void {
  //   this.pokemons.push(pokemon);
  //   console.log("lista de pokemon", this.pokemons);
  // }

  // detallePokemon(pokemon: ipokemon): void {
  //   this.pokemonSelected = pokemon;
  // }

  // eliminarPokemon(pokemon: ipokemon): void {
  //   this.pokemons = this.pokemons.filter((p) => p !== pokemon);
  //   this.pokemonSelected = undefined;
  // }
}
