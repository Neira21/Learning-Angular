import { concatMap, forkJoin, from, map, switchMap, toArray } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import {
  Pokemon,
  PokemonListResponse,
  PokemonData,
} from '../interfaces/pokemon.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);

  // ✅ Método 1: httpResource directo para datos estáticos con tipado
  getPokemonWithData() {
    return this.http
      .get<PokemonListResponse>('https://pokeapi.co/api/v2/pokemon?limit=151')
      .pipe(
        switchMap((response) => {
          const details = response.results.map((pokemon) =>
            this.http.get<PokemonData>(pokemon.url).pipe(
              map((detail) => ({
                id: detail.id,
                name: detail.name,
                types: detail.types,
                image: detail.sprites.front_default,
                height: detail.height,
                weight: detail.weight,
                abilities: detail.abilities,
                stats: detail.stats,
              }))
            )
          );
          return forkJoin(details);
        })
      );
  }

  getPokemonWithData2() {
    return this.http
      .get<PokemonListResponse>('https://pokeapi.co/api/v2/pokemon?limit=20')
      .pipe(
        map((res) => res.results),
        switchMap((pokemons) =>
          from(pokemons).pipe(
            concatMap((pokemon) =>
              this.http.get<PokemonData>(pokemon.url).pipe(
                map((detail) => ({
                  id: detail.id,
                  name: detail.name,
                  types: detail.types,
                  image: detail.sprites.front_default,
                  height: detail.height,
                  weight: detail.weight,
                  abilities: detail.abilities,
                  stats: detail.stats,
                }))
              )
            ),
            toArray()
          )
        )
      );
  }
}
