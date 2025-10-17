import { MatIconModule } from '@angular/material/icon';
import { Component, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';

export type MenuItem = {
  icon: string;
  label: string;
  path?: string;
};

@Component({
  selector: 'app-custom-sidebar',
  imports: [MatListModule, MatIconModule],
  templateUrl: './custom-sidebar.html',
  styleUrl: './custom-sidebar.css',
})
export class CustomSidebar {
  menuItems = signal<MenuItem[]>([
    { icon: 'home', label: 'Home', path: '/home' },
    { icon: 'explore', label: 'Explore', path: '/explore' },
    { icon: 'subscriptions', label: 'Subscriptions', path: '/subscriptions' },
    { icon: 'library_books', label: 'Library', path: '/library' },
    { icon: 'history', label: 'History', path: '/history' },
  ]);
}
