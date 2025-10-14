import { Component, computed, effect, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Header } from './components/header/header';
import { CustomSidenav } from './components/custom-sidenav/custom-sidenav';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSidenavModule, Header, CustomSidenav],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  collapse = signal(false);

  constructor() {
    effect(() => {
      console.log(this.collapse());
      console.log(this.width());
    });
  }

  width = computed(() => (this.collapse() ? '64' : '250'));
}
