import { Component, effect, inject, signal } from '@angular/core';
import { AuthService, LoginRequest } from '../services/auth.service';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Role, RoleService } from '../services/role.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  private roleService = inject(RoleService);

  // Signals para el estado del componente
  errorMessage = signal<string>('');
  showPassword = signal<boolean>(false);
  showPasswordConfirm = signal<boolean>(false);
  roles = signal<Role[]>([]);

  // FormGroup dinámico
  loginForm: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]],
    rol_id: [2, [Validators.required]] // Rol 'user' por defecto
  },
{
  validators: this.passwordMatchValidator
});

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
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

  // Getters para acceso fácil a los controles
  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }
  get confirmPassword() { return this.loginForm.get('confirmPassword'); }
  get rol_id() { return this.loginForm.get('rol_id'); }

  // Getter para estado de loading y error del servicio
  get isLoadingRegister() { return this.roleService.isLoading; }
  get ErrorRegister() { return this.roleService.isError; }


  constructor() {
    // Limpiar mensaje de error cuando el usuario escriba
    this.loginForm.valueChanges.subscribe(() => {
      if (this.errorMessage()) {
        this.errorMessage.set('');
      }
      console.log('Form value changed:', this.loginForm.value);
    });

    effect(() => {
      console.log(this.loginForm.value)
    });

    // Cargar roles al iniciar el componente
    this.roleService.getRoles().subscribe(roles => {
      this.roles.set(roles.data)
    });

  }

  /**
   * Procesar login
   */
  onSubmit(): void {

    console.log('Form value:', this.loginForm.value);

    if (this.loginForm.valid) {
      const credentials: LoginRequest = {
        usuario: this.username?.value,  // ← Cambiar a 'usuario'
        password: this.password?.value,
        rol_id: Number(this.rol_id?.value)
      };

      console.log('Login credentials:', credentials);

      // Deshabilitar el formulario durante el login
      // el desabilitar es para evitar múltiples envíos
      this.loginForm.disable();

      this.authService.register(credentials).subscribe({
        next: (response) => {
          this.errorMessage.set('');
          // Pequeño delay para mejor UX antes de redirigir
          setTimeout(() => {
            this.router.navigate(['/content']);
          }, 1000);
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
  }

  /**
   * Alternar visibilidad de contraseña
   */
  togglePasswordVisibility(): void {
    this.showPassword.update(show => !show);
  }

  togglePasswordConfirmVisibility(): void {
    this.showPasswordConfirm.update(show => !show);
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
      if (field.errors['passwordMismatch']){
        return 'Las contraseñas no coinciden';
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
      username: 'Usuario',
      password: 'Contraseña',
      confirmPassword: 'Confirmar Contraseña'
    };
    return labels[fieldName] || fieldName;
  }

}
