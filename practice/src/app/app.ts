import { Component, signal } from '@angular/core';
import { MiDirectiva } from './directivas/mi-directiva';
//import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    //RouterOutlet
    MiDirectiva,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('practice');
}
