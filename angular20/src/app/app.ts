import { Component, signal, inject, effect, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './services/apiservice.service';
import { FormsModule } from '@angular/forms';
import { TitleCasePipe, JsonPipe, AsyncPipe } from '@angular/common';
import {
  Pokemon,
  PokemonData,
  PokemonListResponse,
} from './interfaces/pokemon.interface';
import { userroles } from './services/usersroles.service';

import { role, rolesResponse } from './services/usersroles.service';
import { ImagePokePipe } from './image-poke-pipe';
import { toSignal } from '@angular/core/rxjs-interop';
import { EmojiSelector } from './components/emoji-selector/emoji-selector';
import { Map } from './components/map/map';
import { YoutubePlayer } from './components/youtube-player/youtube-player';
@Component({
  selector: 'app-root',
  imports: [
    //RouterOutlet,
    FormsModule,
    TitleCasePipe,
    Map,
    ImagePokePipe,
    AsyncPipe,
    //JsonPipe
    EmojiSelector,
    YoutubePlayer,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('angular20');
  protected readonly Math = Math; // ✅ Para usar Math.round en el template
  protected rolesList = signal<role[]>([
    { id: 1, nombre: 'Admin' },
    { id: 2, nombre: 'User' },
    { id: 3, nombre: 'Guest' },
  ]);

  protected newRoleName = signal('');

  // ✅ Inyectar el servicio con protected para usar en template
  private readonly apiService = inject(ApiService);
  private readonly rolService = inject(userroles);

  protected readonly isLoading = signal(false);
  protected readonly error = signal('');

  protected readonly responseSignal = signal<Pokemon[] | null>(null);

  // ✅ Signals para medir tiempo
  protected readonly method1Time = signal<number | null>(null);
  protected readonly method2Time = signal<number | null>(null);
  protected readonly isTestingMethod1 = signal(false);
  protected readonly isTestingMethod2 = signal(false);

  constructor() {
    // this.apiService.getPokemonWithData().subscribe({
    //   next: (data) => {
    //     this.isLoading.set(false);
    //     this.responseSignal.set(data);
    //   },
    //   error: (error) => {
    //     console.error('Error acaaa:', error);
    //     this.isLoading.set(false);
    //   },
    //   complete: () => {
    //     this.isLoading.set(false);
    //   },
    // });

    // Para cargar roles desde la API
    //this.loadRoles();

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
        this.newRoleName.set('');
        this.error.set('');
      },
      error: (error) => {
        console.error('Error adding role:', error);
        this.error.set(error.error.error);
      },
    });
  }

  testMethod1() {
    this.isTestingMethod1.set(true);
    this.method1Time.set(null);

    console.log('🚀 Iniciando Método 1 (forkJoin)...');
    const startTime = performance.now();

    this.apiService.getPokemonWithData().subscribe({
      next: (data) => {
        const endTime = performance.now();
        const duration = endTime - startTime;

        this.method1Time.set(Math.round(duration));
        this.responseSignal.set(data);
        this.isLoading.set(false);
        this.isTestingMethod1.set(false);

        console.log(`✅ Método 1 completado:`);
        console.log(`   - Tiempo total: ${Math.round(duration)}ms`);
        console.log(`   - Pokémon obtenidos: ${data.length}`);
        console.log(
          `   - Promedio por Pokémon: ${Math.round(duration / data.length)}ms`,
        );
      },
      error: (error) => {
        console.error('❌ Error método 1:', error);
        this.isTestingMethod1.set(false);
      },
    });
  }

  // ✅ Método para testear método 2 (concatMap)
  testMethod2() {
    this.isTestingMethod2.set(true);
    this.method2Time.set(null);

    console.log('🐌 Iniciando Método 2 (concatMap)...');
    const startTime = performance.now();

    this.apiService.getPokemonWithData2().subscribe({
      next: (data) => {
        const endTime = performance.now();
        const duration = endTime - startTime;

        this.method2Time.set(Math.round(duration));
        this.responseSignal.set(data);
        this.isLoading.set(false);
        this.isTestingMethod2.set(false);

        console.log(`✅ Método 2 completado:`);
        console.log(`   - Tiempo total: ${Math.round(duration)}ms`);
        console.log(`   - Pokémon obtenidos: ${data.length}`);
        console.log(
          `   - Promedio por Pokémon: ${Math.round(duration / data.length)}ms`,
        );
      },
      error: (error) => {
        console.error('❌ Error método 2:', error);
        this.isTestingMethod2.set(false);
      },
    });
  }

  // ✅ Limpiar resultados
  clearResults() {
    this.responseSignal.set(null);
    this.method1Time.set(null);
    this.method2Time.set(null);
    this.isLoading.set(false);
  }

  // Usando httpresource para angular20
  protected readonly pokeListResource =
    this.apiService.getPokemonListResource();

  // Usando async pipe
  protected readonly pokeListAsync = this.apiService.getPokemonWithData();

  // usando tosignal

  // convierte el observable en signal
  protected readonly pokeListSignal = toSignal(
    this.apiService.getPokemonWithData(),
    { initialValue: null },
  );
}
