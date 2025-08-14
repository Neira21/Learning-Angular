import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivateFn } from '@angular/router';
import { AuthService } from './services/auth.service';

/**
 * Guard que protege rutas que requieren autenticación
 */
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Verificar si el usuario está autenticado
  const isAuthenticated = authService.checkAuthenticationStatus();

  console.log('🛡️ Auth Guard - Estado:', {
    isAuthenticated,
    currentRoute: state.url,
    token: !!authService.getToken()
  });

  if (isAuthenticated) {
    return true;
  } else {
    // Redirigir al login si no está autenticado
    console.log('🚫 Acceso denegado, redirigiendo al login');
    router.navigate(['/']);
    return false;
  }
};

/**
 * Guard que evita acceso al login si ya está autenticado
 */
export const loginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Verificar si el usuario está autenticado
  const isAuthenticated = authService.checkAuthenticationStatus();

  console.log('🚪 Login Guard - Estado:', {
    isAuthenticated,
    currentRoute: state.url
  });

  if (isAuthenticated) {
    // Si ya está autenticado, redirigir al content
    console.log('✅ Ya autenticado, redirigiendo al content');
    router.navigate(['/content']);
    return false;
  } else {
    return true;
  }
};
