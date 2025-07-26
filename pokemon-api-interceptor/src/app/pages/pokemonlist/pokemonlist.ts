import { Component, inject, signal } from '@angular/core';
import { PokemonService } from '../../servives/pokemon.service';
import { AsyncPipe } from '@angular/common';
import { Pokemonitem } from '../../components/pokemonitem/pokemonitem';
import { ErrorMessage } from '../../components/error-message/error-message';
import { catchError, EMPTY, Observable } from 'rxjs';
import { iresponse } from '../../interfaces/results';
import { Error } from '../../interfaces/error';


@Component({
  selector: 'app-pokemonlist',
  imports: [AsyncPipe, Pokemonitem, ErrorMessage],
  templateUrl: './pokemonlist.html',
  styleUrl: './pokemonlist.css'
})


export class Pokemonlist {

  servicePokemon = inject(PokemonService)

  public pokemonResult$! : Observable<iresponse>
  public errorMessage = signal<Error | null>(null)

  ngOnInit(): void {

    this.pokemonResult$ = this.servicePokemon.getPokemonList().pipe(catchError((error: Error) => {
      this.errorMessage.set(error);
      return EMPTY
    }))
  }
}
