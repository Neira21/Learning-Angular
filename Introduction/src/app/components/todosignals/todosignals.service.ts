import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TodosignalsService {
  todosignals: string[] = [];

  getTodos(): string[] {
    return localStorage.getItem('todosignals')
      ? JSON.parse(localStorage.getItem('todosignals')!)
      : [];
  }

  addTodo(todo: string): void {
    const stored = localStorage.getItem('todosignals');
    const todos = stored ? JSON.parse(stored) : [];
    todos.push(todo);
    localStorage.setItem('todosignals', JSON.stringify(todos));
  }

  removeTodo(todo: string): void {
    const stored = localStorage.getItem('todosignals');
    const todos = stored ? JSON.parse(stored) : [];

    const index = todos.indexOf(todo);
    if (index > -1) {
      todos.splice(index, 1);
    }
    localStorage.setItem('todosignals', JSON.stringify(todos));
  }
}
