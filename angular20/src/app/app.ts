import { Component, signal, inject, effect, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './services/apiservice.service';
import { FormsModule } from '@angular/forms';
import { TitleCasePipe, JsonPipe } from '@angular/common';
import {
  Pokemon,
  PokemonData,
  PokemonListResponse,
} from './interfaces/pokemon.interface';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, TitleCasePipe, JsonPipe],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('angular20');

  // ✅ Inyectar el servicio con protected para usar en template
  protected apiService = inject(ApiService);
  protected readonly isLoading = signal(true);

  protected readonly responseSignal = signal<Pokemon[] | null>(null);

  constructor() {
    this.apiService.getPokemonWithData().subscribe({
      next: (data) => {
        this.isLoading.set(false);
        this.responseSignal.set(data);
      },
      error: (error) => {
        console.error('Error:', error);
        this.isLoading.set(false);
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });

    effect(() => {
      console.log('🔄 API Response Signal Updated:', this.responseSignal());
    });
  }

  addPokemon() {
    this.responseSignal.update((current) => {
      const newPokemon = {
        id: 999,
        name: 'NewPokemon',
        types: [],
        height: 10,
        weight: 100,
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/132.svg',
        abilities: [],
        stats: [],
      };
      return current ? [newPokemon, ...current] : [newPokemon];
    });
  }
}
