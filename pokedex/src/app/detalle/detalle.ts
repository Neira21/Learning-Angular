
import { Component, input, inject, effect } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ShowarrayPipe } from './showarray-pipe';

@Component({
  selector: 'poke-detalle',
  imports: [TitleCasePipe, RouterLink, ShowarrayPipe],
  templateUrl: './detalle.html',
  styleUrl: './detalle.css'
})
export default class Detalle {
  readonly name = input<string>('');

  readonly pokemonService = inject(PokemonService)

  protected readonly pokemonDetalle = this.pokemonService.getPokemonDetail(this.name);


  constructor(){
    effect(() => {
      console.log('🔄 Pokemon Detail State:');
      console.log('  📊 Value:', this.pokemonDetalle.value());
    })
  }


}
