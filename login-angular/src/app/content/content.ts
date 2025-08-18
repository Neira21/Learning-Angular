import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-content',
  imports: [CommonModule],
  templateUrl: './content.html',
  styleUrl: './content.css'
})
export class Content {
  private authService = inject(AuthService);
  private router = inject(Router);

  // Getter para acceder al usuario actual y estado de autenticación
  get currentUser() { return this.authService.currentUser; }
  get isAuthenticated() { return this.authService.isAuthenticated; }

  constructor() {
    // Verificar si el usuario está autenticado
    if (!this.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }

  /**
   * Cerrar sesión
   */
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
