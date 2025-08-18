import { Routes } from '@angular/router';
import { authGuard, loginGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./login/login').then(m => m.Login),
    //canActivate: [loginGuard] // Evita acceso al login si ya está autenticado
  },
  {
    path: 'content',
    loadComponent: () => import('./content/content').then(m => m.Content),
    //canActivate: [authGuard] // Protege la ruta del content
  },
  {
    path: '404',
    loadComponent: () => import('./not-found/not-found').then(m => m.NotFound)
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];
