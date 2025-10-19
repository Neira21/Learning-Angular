import { Routes } from '@angular/router';
import { App } from './app';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
  },
  {
    path: 'explore',
    loadComponent: () =>
      import('./pages/explore/explore').then((m) => m.Explore),
  },
  {
    path: 'subscriptions',
    loadComponent: () =>
      import('./pages/subscriptions/subscriptions').then(
        (m) => m.Subscriptions
      ),
  },
  {
    path: 'library',
    loadComponent: () =>
      import('./pages/library/library').then((m) => m.Library),
  },
  {
    path: 'history',
    loadComponent: () =>
      import('./pages/history/history').then((m) => m.History),
  },
];
