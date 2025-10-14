import { Component, input, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface MenuItem {
  icon: string;
  label: string;
  path: string;
}

@Component({
  selector: 'app-custom-sidenav',
  imports: [MatListModule, MatIconModule, RouterLink, RouterLinkActive],
  template: `
    <h2
      class="text-xl font-semibold p-2 mb-1 text-center"
      [class.text.center]="collapsed()"
    >
      {{ collapsed() ? 'MA' : 'Mi Aplicación' }}
    </h2>

    <ul class="p-2 flex flex-col w-full gap-2">
      @for(item of items(); track item.label){
      <li>
        <a
          [routerLink]="item.path"
          routerLinkActive="bg-black text-white"
          class="hover:bg-black/20 cursor-pointer w-full p-2 flex items-center gap-2 rounded-md"
          [class.justify-center]="collapsed()"
        >
          <mat-icon class="!text-[20px] !size=5">{{ item.icon }}</mat-icon>
          @if(!collapsed()){
          <span>{{ item.label }}</span>
          }
        </a>
      </li>
      }
    </ul>
  `,
})
export class CustomSidenav {
  items = signal<MenuItem[]>([
    { icon: 'home', label: 'Home', path: '/home' },
    { icon: 'info', label: 'About', path: '/about' },
    { icon: 'contact_mail', label: 'Contact', path: '/contact' },
    { icon: 'settings', label: 'Settings', path: '/settings' },
  ]);

  collapsed = input.required<boolean>();
}
