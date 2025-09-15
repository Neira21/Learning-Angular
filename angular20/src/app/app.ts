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
import { userroles } from './services/usersroles.service';

import { role, rolesResponse } from './services/usersroles.service';

@Component({
  selector: 'app-root',
  imports: [
    //RouterOutlet,
    FormsModule,
    TitleCasePipe,
    //JsonPipe
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('angular20');

  protected rolesList = signal<role[]>([
    { id: 1, nombre: 'Admin' },
    { id: 2, nombre: 'User' },
    { id: 3, nombre: 'Guest' },
  ]);

  protected newRoleName = signal('');

  // ✅ Inyectar el servicio con protected para usar en template
  protected apiService = inject(ApiService);
  protected rolService = inject(userroles);

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

    this.loadRoles();

    // effect(() => {
    //   console.log('🔄 API Response Signal Updated:', this.responseSignal());
    // });

    effect(() => {
      console.log('🔄 Roles List Updated:', this.newRoleName());
    });
  }

  addColorByType(type: string): string {
    switch (type.toLowerCase()) {
      case 'grass':
        return 'green';
      case 'poison':
        return 'purple';
      case 'fire':
        return 'red';
      case 'flying':
        return 'skyblue';
      case 'water':
        return 'blue';
      case 'bug':
        return 'olive';
      case 'normal':
        return 'gray';
      case 'electric':
        return 'yellow';
      case 'ground':
        return 'sienna';
      case 'fairy':
        return 'pink';
      case 'fighting':
        return 'brown';
      case 'psychic':
        return 'indigo';
      case 'rock':
        return 'darkgoldenrod';
      case 'steel':
        return 'lightgray';
      case 'ice':
        return 'darkturquoise';
      case 'ghost':
        return 'darkviolet';
      case 'dragon':
        return 'darkblue';
      case 'dark':
        return 'black';
      default:
        return 'lightgray';
    }
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

  loadRoles() {
    this.rolService.getRoles().subscribe({
      next: (data: rolesResponse) => {
        console.log(data.data);
        this.rolesList.set(data.data);
      },
      error: (error) => {
        console.error('Error loading roles:', error);
      },
    });
  }

  addRole() {
    const nombre = this.newRoleName().trim();
    console.log('Adding role:', nombre);
    if (!nombre) return;

    this.rolService.addRole(nombre).subscribe({
      next: () => {
        console.log('Role added successfully');
        this.loadRoles();
      },
      error: (error) => {
        console.error('Error adding role:', error);
      },
    });
  }
}
