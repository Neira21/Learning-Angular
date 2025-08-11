import { Component, effect, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StarRating } from './star-rating/star-rating';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, StarRating],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('⭐ Angular Star Rating Component');

  rating = signal<number>(0);

  constructor(){
    effect(()=>{
      console.log('🔄 Valor del Rating desde app component:', this.rating());
    })
  }
}
