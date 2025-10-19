import { MatIconModule } from '@angular/material/icon';
import { Component, input, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';

export type MenuItem = {
  icon: string;
  label: string;
  path?: string;
};

@Component({
  selector: 'app-custom-sidebar',
  imports: [MatListModule, MatIconModule, RouterLink, RouterLinkActive],
  templateUrl: './custom-sidebar.html',
  styleUrl: './custom-sidebar.css',
})
export class CustomSidebar {
  collapse = input<boolean>();
  menuItems = signal<MenuItem[]>([
    { icon: 'home', label: 'Home', path: '/home' },
    { icon: 'explore', label: 'Explore', path: '/explore' },
    { icon: 'subscriptions', label: 'Subscriptions', path: '/subscriptions' },
    { icon: 'library_books', label: 'Library', path: '/library' },
    { icon: 'history', label: 'History', path: '/history' },
  ]);
}
