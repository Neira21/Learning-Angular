import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  userForm = new FormGroup({
    username: new FormControl('', [Validators.required] ),
    email: new FormControl('', [Validators.required, Validators.email]),
    password : new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required])
  });

  getFormErrors(){
    const errors: any = []
    Object.keys(this.userForm.controls).forEach(key => {
      const control  = this.userForm.get(key);
      if(control && control.errors){
        errors[key] = control.errors;
      }
    });
    return errors;
  }

  onSubmit(){
    console.log('Form Submitted', this.userForm.value);
  }
}
