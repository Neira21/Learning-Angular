import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Body } from './components/body/body';

@Component({
  selector: 'app-root',
  imports: [Header, Body],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('i18n-internacionalizacion');
}
