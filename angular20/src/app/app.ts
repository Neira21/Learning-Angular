import { Component, signal, inject, effect, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './services/apiservice.service';
import { FormsModule } from '@angular/forms';
import { TitleCasePipe, JsonPipe } from '@angular/common';
import { PokemonListResponse } from './interfaces/pokemon.interface';

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

  protected readonly responseSignal = signal<PokemonListResponse | undefined>(
    undefined
  );

  constructor() {
    this.apiService.pokemonData().subscribe((data) => {
      this.responseSignal.set(data);
    });
  }
}
