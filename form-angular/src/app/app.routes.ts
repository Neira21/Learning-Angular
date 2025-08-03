import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./form/form').then(m => m.Form)
  },
  {
    path: 'formMaterial',
    loadComponent: () => import('./formmaterial/formmaterial').then(m => m.Formmaterial)
  }
];
