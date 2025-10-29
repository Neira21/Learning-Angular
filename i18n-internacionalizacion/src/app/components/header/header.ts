import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  title = signal($localize`Ejemplo de Internacionalización`);
  subtitle = signal($localize`Aprendiendo a usar i18n, traducir textos y más`);
}
