import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withFetch()),
  ],
};

//provideRouter(routes, withComponentInputBinding()), para obtener los parametro de la ruta usando Input() con el mismo nombre de la variable, y captura el valor

//WithFetch() para que el HttpClient use fetch en lugar de XMLHttpRequest

// version 18 con ssr
export const appconfig18: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    //provideClientHydration(),
  ],
};

/* El provideZoneChangeDetection eventCoalescing: true
es una función para solucionar el problema de detectar el cambio en cierto casos
Si se toca el boton, se ejecuta el handleClick() que cambia el valor de title y no el href

<a href="./about"><button (click)="handleClick()">Click me</button></a>


---
Lo que quiere angular es que desaparezca el zone.js por lo que para la version 19
se probaba la funcion provideExperimentalZonelessChangeDetection(), actualmente es provideZonelessChangeDetection()
*/
