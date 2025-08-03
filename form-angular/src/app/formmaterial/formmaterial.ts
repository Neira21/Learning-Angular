import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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

  // userForm = new FormGroup({
  //   username: new FormControl('', [Validators.required]),
  //   email: new FormControl('', [Validators.required, Validators.email]),
  //   password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  //   confirmPassword: new FormControl('', [Validators.required]),
  //   role: new FormControl('', [Validators.required])
  // });

  userForm = this._formBulder.nonNullable.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]],
    role: ['', [Validators.required]]
  })

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
    if (this.userForm.valid) {
      console.log('✅ Material Form Submitted:', this.userForm.value);
    } else {
      this.userForm.markAllAsTouched();
      console.log('❌ Material Form is invalid');
      console.log('🚨 Material Form Errors:', this.getFormErrors());
    }
  }

  resetForm() {
    this.userForm.reset();
    console.log('🔄 Material Form Reset');
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
