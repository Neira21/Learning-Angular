import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ipokemon } from '../models/pokemon.interface';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-pokemondetails',
  standalone: true,
  imports: [MatCardModule, MatButton],
  templateUrl: './pokemondetails.component.html',
  styleUrl: './pokemondetails.component.css',
})
export class PokemondetailsComponent {

  @Input() pokemon?: ipokemon;


  @Output() eliminarPokemons = new EventEmitter<ipokemon>();

  deletePokemon(): void{
    if (this.pokemon) {
      this.eliminarPokemons.emit(this.pokemon);
    }
  }










































  // @Input({ required: true }) pokemon?: ipokemon;

  // @Output() eliminarPokemons = new EventEmitter<ipokemon>();

}
