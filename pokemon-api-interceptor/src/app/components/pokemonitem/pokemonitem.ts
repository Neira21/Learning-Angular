import { Component, inject, Input, OnInit } from '@angular/core';
import { ipokemon } from '../../interfaces/results';
import { PokemonService } from '../../servives/pokemon.service';
import { AsyncPipe, TitleCasePipe } from '@angular/common';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-pokemonitem',
  imports: [AsyncPipe, TitleCasePipe],
  templateUrl: './pokemonitem.html',
  styleUrl: './pokemonitem.css'
})
export class Pokemonitem {
  @Input() pokemonInfo!: ipokemon;

  servicePokemon = inject(PokemonService);

  pokemon$!: Observable<any>;

  showDetails = false;

 ngOnInit(): void {
    // ✅ Una sola petición, datos compartidos
    this.pokemon$ = this.servicePokemon.getPokemonByName(this.pokemonInfo.name).pipe(
      map(pokemon => ({
        // Info básica (para mostrar siempre)
        name: pokemon.name,
        image: pokemon.sprites.front_default,
        id: pokemon.id,

        // Detalles (para mostrar bajo demanda)
        height: pokemon.height,
        weight: pokemon.weight,
        types: pokemon.types.map((t: any) => t.type.name),
        abilities: pokemon.abilities.map((a: any) => a.ability.name),
        stats: pokemon.stats,
        baseExperience: pokemon.base_experience
      })),
    );
  }

  toggleDetails() {
    this.showDetails = !this.showDetails;
  }

  closeDetails() {
    this.showDetails = false;
  }



}
