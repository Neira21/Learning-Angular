import { concatMap, forkJoin, from, map, switchMap, toArray } from 'rxjs';
import {
  HttpClient,
  httpResource,
  HttpResourceRef,
} from '@angular/common/http';
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

  readonly pokeUrl = 'https://pokeapi.co/api/v2';

  // ✅ Método 1: httpResource directo para datos estáticos con tipado
  getPokemonWithData() {
    return this.http
      .get<PokemonListResponse>('https://pokeapi.co/api/v2/pokemon?limit=20')
      .pipe(
        switchMap((response) => {
          const details = response.results.map((pokemon) => {
            const pokemonId = this.extractIdFromUrl(pokemon.url);
            const individual = `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`;

            return this.http.get<PokemonData>(individual).pipe(
              map((detail) => ({
                id: detail.id,
                name: detail.name,
                types: detail.types,
                image: detail.sprites.front_default,
                height: detail.height,
                weight: detail.weight,
                abilities: detail.abilities,
                stats: detail.stats,
                isFavorite: Math.random() < 0.5,
              }))
            );
          });
          return forkJoin(details).pipe(
            map((results) => results.filter(Boolean))
          );
        })
      );
  }

  private extractIdFromUrl(url: string): number {
    const segments = url.split('/');
    const id = Number(segments[6]);
    return id;
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

  //using httpresource for angular 20

  getPokemonListResource(): HttpResourceRef<PokemonListResponse | undefined> {
    return httpResource<PokemonListResponse>(
      () => `${this.pokeUrl}/pokemon?limit=20`
    );
  }
}
