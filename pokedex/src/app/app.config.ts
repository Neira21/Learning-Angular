import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';




export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    // habilitar input para capturar el valor de parametros de ruta
    provideRouter(routes, withComponentInputBinding()),
    // habilitar HttpClient para hacer peticiones HTTP
    provideHttpClient()


  ]
};
