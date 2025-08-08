import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'pokemon',
    loadComponent: () => import('./pokemon/pokemon').then(m => m.Pokemon)
  },
  {
    path: 'pokemon/:name',
    loadComponent: () => import('./detalle/detalle')
  },
  {
    path: '',
    redirectTo: 'pokemon',
    pathMatch: 'full'
  },
  {
    path: '**',
    // Puedes redirigir a una página 404 o similar
    redirectTo: 'pokemon',
    pathMatch: 'full'
  }

];
