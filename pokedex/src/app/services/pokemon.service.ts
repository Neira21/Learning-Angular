import { Observable } from 'rxjs';
import { HttpClient, httpResource, HttpResourceRef } from '@angular/common/http';
import { inject, Injectable, Signal } from '@angular/core';
import { PokeList, PokeListResult, Pokemon } from '../models/poke-list-model';
@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  readonly pokemonURL = 'https://pokeapi.co/api/v2';
  getPokemonList(): HttpResourceRef<PokeList | undefined> {
    return httpResource<PokeList>(()=>`${this.pokemonURL}/pokemon?limit=151` )
  }

  getPokemonDetail(name: Signal<string>): HttpResourceRef< Pokemon | undefined> {
    return httpResource<Pokemon>(()=>`${this.pokemonURL}/pokemon/${name()}` )
  }

}
