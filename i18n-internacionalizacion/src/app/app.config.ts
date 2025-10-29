import {
  ApplicationConfig,
  DEFAULT_CURRENCY_CODE,
  LOCALE_ID,
  inject,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    {
      provide: DEFAULT_CURRENCY_CODE,
      useFactory: () => {
        const locale = inject(LOCALE_ID);
        if (locale.startsWith('es-PE')) return 'PEN';
        if (locale.startsWith('en')) return 'USD';
        if (locale.startsWith('it')) return 'EUR';
        if (locale.startsWith('fr')) return 'EUR';
        if (locale.startsWith('de')) return 'EUR';
        return 'USD';
      },
    },
  ],
};
