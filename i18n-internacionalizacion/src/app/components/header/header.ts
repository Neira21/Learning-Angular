import { Component, inject, LOCALE_ID, signal, computed } from '@angular/core';

interface Language {
  name: string;
  code: string;
}

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  title = signal($localize`Ejemplo de Internacionalización`);
  subtitle = signal($localize`Aprendiendo a usar i18n, traducir textos y más`);

  private readonly locale = inject(LOCALE_ID);

  languages = signal<Language[]>([
    { name: 'Español - Perú', code: 'es-PE' },
    { name: 'Inglés', code: 'en' },
    { name: 'Italiano', code: 'it' },
    { name: 'Francés', code: 'fr' },
    { name: 'Alemán', code: 'de' },
  ]);

  currentLanguage = computed(
    () =>
      this.languages().find((lang) => lang.code === this.locale)?.code ||
      'es-PE'
  );

  changeValue(newLanguage: string): void {
    if (this.currentLanguage() === newLanguage) return;

    const baseurl = window.location.origin;
    const newUrl = `${baseurl}/${newLanguage}`;
    window.location.href = newUrl;
  }
}
