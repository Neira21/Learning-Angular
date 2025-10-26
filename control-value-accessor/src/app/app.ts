import { Component, effect, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StarRating } from './star-rating/star-rating';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { InputAge } from './components/input-age/input-age';

@Component({
  selector: 'app-root',
  imports: [
    //RouterOutlet,
    // StarRating,
    ReactiveFormsModule,
    InputAge,
  ],
  //templateUrl: './app.html',
  template: `
    <form class="form" [formGroup]="form" (ngSubmit)="save()">
      <input type="text" placeholder="Name" formControlName="name" />
      <app-input-age formControlName="age"></app-input-age>
      <button type="submit">Guardar</button>
    </form>

    <div>
      <p>value of age: {{ ageControl?.value }}</p>
    </div>
  `,
  styleUrl: './app.css',
})
export class App {
  // protected readonly title = signal('⭐ Angular Star Rating Component');
  // rating = signal<number>(0);
  // constructor() {
  //   effect(() => {
  //     console.log('🔄 Valor del Rating desde app component:', this.rating());
  //   });
  // }

  // Reactive Form Otro curso de Control Value Accessor
  private _formBuilder = inject(FormBuilder);

  get ageControl() {
    return this.form.get('age');
  }

  form = this._formBuilder.group({
    name: this._formBuilder.control(''),
    age: this._formBuilder.control('30'),
  });

  // changeAgeFather(age: string) {
  //   this.ageControl?.setValue(age);
  // }

  save() {
    console.log(this.form.value);
  }
}
