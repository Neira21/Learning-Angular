import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Pokemon, PokemonListResponse } from '../interfaces/pokemon.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);

  // ✅ Método 1: httpResource directo para datos estáticos con tipado
  pokemonData() {
    return this.http.get<PokemonListResponse | undefined>(
      'https://pokeapi.co/api/v2/pokemon?limit=151'
    );
  }

  // ✅ Método 2: httpResource con parámetros dinámicos y tipado
  private pokemonId = signal(1);

  pokemonDetail = this.http.get<Pokemon | undefined>(
    `https://pokeapi.co/api/v2/pokemon/${this.pokemonId()}`
  );
}
