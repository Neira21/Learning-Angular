import { CharacterExample } from '@app/types/character';
import { Component, signal } from '@angular/core';
// import { MiDirectiva } from '@app/directivas/mi-directiva';
// import { RouterOutlet } from '@angular/router';
// import { Defer } from '@app/defer/defer';
// import { For } from '@app/for/for';
// import { DeferAdvanced } from '@app/defer-advanced/defer-advanced';
import { Service } from './service/service';
import { Character } from './character/character';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    //RouterOutlet
    //MiDirectiva,
    //Defer,
    //DeferAdvanced,
    //For,
    // Service,
    Character,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('practice');
}
