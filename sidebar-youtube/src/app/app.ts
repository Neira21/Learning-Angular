import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CustomSidebar } from './components/custom-sidebar/custom-sidebar';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    CustomSidebar,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  collapse = signal<boolean>(false);

  sidenavWidth = computed(() => (this.collapse() ? '70px' : '250px'));
}
