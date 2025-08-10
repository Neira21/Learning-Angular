import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, LoginRequest } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  // Signals para el estado del componente
  errorMessage = signal<string>('');
  showPassword = signal<boolean>(false);

  // FormGroup dinámico
  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    rememberMe: [false]
  });

  // Getters para acceso fácil a los controles
  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
  get rememberMe() { return this.loginForm.get('rememberMe'); }

  // Getter para estado de loading del servicio
  get isLoading() { return this.authService.isLoading; }

  constructor() {
    // Limpiar mensaje de error cuando el usuario escriba
    this.loginForm.valueChanges.subscribe(() => {
      if (this.errorMessage()) {
        this.errorMessage.set('');
      }
    });
  }

  /**
   * Procesar login
   */
  onSubmit(): void {
    if (this.loginForm.valid) {
      const credentials: LoginRequest = {
        email: this.email?.value,
        password: this.password?.value
      };

      // Deshabilitar el formulario durante el login
      this.loginForm.disable();

      this.authService.login(credentials).subscribe({
        next: (response) => {
          this.errorMessage.set('');

          // Pequeño delay para mejor UX antes de redirigir
          setTimeout(() => {
            this.router.navigate(['/content']);
          }, 500);
        },
        error: (error) => {
          this.errorMessage.set(error.message || 'Error al iniciar sesión');

          // Rehabilitar el formulario si hay error
          this.loginForm.enable();
        }
      });
    } else {
      this.markFormGroupTouched();
      this.errorMessage.set('Por favor, completa todos los campos correctamente');
    }
  }  /**
   * Alternar visibilidad de contraseña
   */
  togglePasswordVisibility(): void {
    this.showPassword.update(show => !show);
  }

  /**
   * Marcar todos los campos como touched para mostrar errores
   */
  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }

  /**
   * Obtener mensaje de error para un campo específico
   */
  getFieldError(fieldName: string): string {
    const field = this.loginForm.get(fieldName);

    if (field?.errors && field.touched) {
      if (field.errors['required']) {
        return `${this.getFieldLabel(fieldName)} es requerido`;
      }
      if (field.errors['email']) {
        return 'Ingresa un email válido';
      }
      if (field.errors['minlength']) {
        return `${this.getFieldLabel(fieldName)} debe tener al menos ${field.errors['minlength'].requiredLength} caracteres`;
      }
    }
    return '';
  }

  /**
   * Obtener label amigable para campos
   */
  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      email: 'Email',
      password: 'Contraseña'
    };
    return labels[fieldName] || fieldName;
  }

  /**
   * Llenar con credenciales de prueba
   */
  fillTestCredentials(userType: 'admin' | 'user' | 'demo'): void {
    const testCredentials = {
      admin: { email: 'admin@test.com', password: '123456' },
      user: { email: 'user@test.com', password: 'password' },
      demo: { email: 'demo@test.com', password: 'demo123' }
    };

    const credentials = testCredentials[userType];
    this.loginForm.patchValue(credentials);
    this.errorMessage.set('');
  }

  /**
   * Obtener usuarios disponibles para testing
   */
  getAvailableUsers() {
    return this.authService.getAvailableUsers();
  }
}
