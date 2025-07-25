import { Component, inject } from '@angular/core';
import { PokemonService } from '../../servives/pokemon.service';
import { AsyncPipe } from '@angular/common';
import { Pokemonitem } from '../../components/pokemonitem/pokemonitem';
import { ErrorMessage } from '../../components/error-message/error-message';
import { catchError, EMPTY, Observable } from 'rxjs';
import { iresponse } from '../../interfaces/results';

@Component({
  selector: 'app-pokemonlist',
  imports: [AsyncPipe, Pokemonitem, ErrorMessage],
  templateUrl: './pokemonlist.html',
  styleUrl: './pokemonlist.css'
})
export class Pokemonlist {

  servicePokemon = inject(PokemonService)
  public pokemonResult$! : Observable<iresponse>
  public errorMessage!: string;



  ngOnInit(): void {
    this.pokemonResult$ = this.servicePokemon.getPokemonList().pipe(catchError((error: string) => {
      this.errorMessage = error;
      return EMPTY
    }))
  }

}
