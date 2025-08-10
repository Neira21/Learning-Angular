import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./login/login').then(m => m.Login)
  },
  {
    path: 'content',
    loadComponent: () => import('./content/content').then(m => m.Content)
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
