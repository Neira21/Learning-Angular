import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Component, signal, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { JsonPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
//import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    // RouterOutlet,
    // Angular Material
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    JsonPipe,
    FormsModule,
    // mat icon
    MatIconModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('reactive-form-example');

  fb =  inject(NonNullableFormBuilder)

  form = this.fb.group({
    name: this.fb.control<string>(''),
    email: this.fb.control<string>(''),
    address: this.fb.group({
      city: this.fb.control<string>(''),
      country: this.fb.control<string>(''),
    }),
    claims: this.fb.array([
      this.fb.group({
        product: this.fb.control<string>(''),
        claim: this.fb.control<string>(''),
      })
    ])

  })

  onSubmit(){
    console.log("Form Submitted", this.form);
  }

  addClaim(){
    this.form.controls.claims.push(
      this.fb.group({
        product: this.fb.control<string>(''),
        claim: this.fb.control<string>(''),
      })
    );
  }

  removeClaim(index: number){
    this.form.controls.claims.removeAt(index);
  }


}
