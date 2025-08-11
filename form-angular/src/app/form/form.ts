import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import {passwordMatchValidator} from '../customValidator/password-match.validator';

@Component({
  selector: 'app-form',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './form.html',
  styleUrl: './form.css'
})
export class Form {
  private formSubscription?: Subscription;
  isSubmitted = false;

  userForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)] ),
    email: new FormControl('', [Validators.required, Validators.email]),
    password : new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required]),
    // Role vacío por defecto para que se pueda validar
    role: new FormControl('', [Validators.required] )
  }, {
    validators: [
      passwordMatchValidator('password', 'confirmPassword')
    ]
  });


  /**
   * Validador personalizado para verificar que las contraseñas coincidan
   */



  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.formSubscription = this.userForm.valueChanges.subscribe(value => {
      // console.log('Form value changed:', this.userForm.value);
      // console.log('Form errors:', this.userForm.controls);
      console.log('Form', this.userForm)
    })

  }

  ngOnDestroy() {
    // 🧹 Limpiar suscripción para evitar memory leaks
    this.formSubscription?.unsubscribe();
  }

  onSubmit(){
    this.isSubmitted = true;


    console.log('Form Submitted', this.userForm);

    if (this.userForm.valid) {
      console.log('✅ Form Submitted Successfully', this.userForm.value);
    } else {
      console.log('❌ Form is invalid, showing all errors');
      // Marcar todos los campos como touched para mostrar errores
      this.markFormGroupTouched(this.userForm);
    }
  }

  /**
   * Marca todos los controles del formulario como touched
   * para mostrar los errores de validación
   */
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();

      // Si es un FormGroup anidado, aplicar recursivamente
      // if (control instanceof FormGroup) {
      //   this.markFormGroupTouched(control);
      // }
    });
  }


}
