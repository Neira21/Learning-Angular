import { Component, Input } from '@angular/core';
import { ipokemon } from '../../interfaces/results';

@Component({
  selector: 'app-pokemonitem',
  imports: [],
  templateUrl: './pokemonitem.html',
  styleUrl: './pokemonitem.css'
})
export class Pokemonitem {
  @Input() pokemonInfo!: ipokemon;
}
