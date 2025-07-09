import { CommonModule } from '@angular/common';
import { TodosignalsService } from './todosignals.service';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
} from '@angular/animations';

@Component({
  selector: 'app-todosignals',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todosignals.component.html',
  styleUrl: './todosignals.component.css',
   animations: [
    trigger('listAnimation', [
      transition(':enter', [
        // Aplica animaciones escalonadas a todos los elementos hijos `li`
        query('li', [
          style({ transform: 'translateX(-100%)', opacity: 0 }),
          stagger(100, [ // 100ms entre cada uno
            animate('400ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
          ])
        ])
      ])
    ]),
    trigger('itemAnimation', [
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class TodosignalsComponent {
  //con signals

  todos = signal<string[]>(
    localStorage.getItem('todosignals')
      ? JSON.parse(localStorage.getItem('todosignals')!)
      : []
  );
  newTodo = signal<string>('');

  addTodo(): void {
    if (this.newTodo().trim()) {
      this.todos.update((todos) => [this.newTodo(), ...todos]);
      this.newTodo.set('');
      // Actualizar localStorage
      localStorage.setItem('todosignals', JSON.stringify(this.todos()));
    }
  }

  removeTodo(todo: string): void {
    this.todos.update((todos) => todos.filter((t) => t !== todo));
    // Actualizar localStorage
    localStorage.setItem('todosignals', JSON.stringify(this.todos()));
  }

  //sin signals
  // _signalsServices = inject(TodosignalsService)

  // todosignals: string[] = [];
  // newTodo: string = "";

  // ngOnInit(): void {
  //   this.todosignals = this._signalsServices.getTodos();
  // }

  // addTodo(): void {
  //   if (this.newTodo.trim()) {
  //     this._signalsServices.addTodo(this.newTodo);
  //     this.todosignals = this._signalsServices.getTodos();
  //     this.newTodo = "";
  //   }
  // }

  // removeTodo(todo: string): void {
  //   this._signalsServices.removeTodo(todo);
  //   this.todosignals = this._signalsServices.getTodos();
  // }
}
