import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-formmaterial',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './formmaterial.html',
  styleUrl: './formmaterial.css'
})
export class Formmaterial implements OnInit, OnDestroy {

  private formSubscription?: Subscription;

  private readonly _formBulder = inject(FormBuilder);

  // 🔒 Validador personalizado para confirmar contraseña
  private passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (!password || !confirmPassword) {
      return null;
    }

    if (password.value !== confirmPassword.value) {
      // Agregar error al campo confirmPassword
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      // Limpiar error si las contraseñas coinciden
      const errors = confirmPassword.errors;
      if (errors) {
        delete errors['passwordMismatch'];
        confirmPassword.setErrors(Object.keys(errors).length === 0 ? null : errors);
      }
      return null;
    }
  }

  userForm = this._formBulder.nonNullable.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]],
    role: ['', [Validators.required]]
  }, { validators: this.passwordMatchValidator }) // 🔒 Agregar validador al FormGroup

  ngOnInit() {
    // 🔄 Suscripción a cambios del formulario
    this.formSubscription = this.userForm.valueChanges.subscribe(formValue => {
      console.log('🎨 Material Form Value Changed:', formValue);
    });
  }

  ngOnDestroy() {
    // 🧹 Limpiar suscripción
    this.formSubscription?.unsubscribe();
  }

  onSubmit() {

    console.log(this.userForm.controls.email.errors);

    if (this.userForm.valid) {
      console.log('✅ Material Form Submitted:', this.userForm.value);
    } else {
      this.userForm.markAllAsTouched();

    }
  }

  resetForm() {
    this.userForm.reset();
  }

  private getFormErrors() {
    const errors: any = {};
    Object.keys(this.userForm.controls).forEach(key => {
      const control = this.userForm.get(key);
      if (control && control.errors) {
        errors[key] = control.errors;
      }
    });
    return errors;
  }
}
