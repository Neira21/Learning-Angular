import { Component, signal } from '@angular/core';
import { MiDirectiva } from '@app/directivas/mi-directiva';
//import { RouterOutlet } from '@angular/router';
import { Defer } from '@app/defer/defer';
import { For } from '@app/for/for';
import { DeferAdvanced } from '@app/defer-advanced/defer-advanced';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    //RouterOutlet
    MiDirectiva,
    Defer,
    DeferAdvanced,
    //For
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('practice');
}
