import { Component } from '@angular/core';
import { TodoModel, IfilterTypeObject, filterType } from '../../models/todo';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-todostandalone',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './todostandalone.component.html',
  styleUrl: './todostandalone.component.css'
})
export class TodostandaloneComponent {
  readonly todos: TodoModel[] = [
    { id: 1, title: 'Tarea 1', completed: true },
    { id: 2, title: 'Tarea 2', completed: true },
    { id: 3, title: 'Tarea 3', completed: false },
    { id: 4, title: 'Tarea 4', completed: true },
    { id: 5, title: 'Tarea 5', completed: false },
  ]

  filteredTodos: TodoModel[] = [...this.todos]

  selectedFilter: filterType = 'all';

  readonly ListObject: IfilterTypeObject[] = [
    { key: 'all', value: 'Todos' },
    { key: 'actives', value: 'Activos' },
    { key: 'completed', value: 'Completados' },
  ];

  filter(selectedKey: filterType){
    this.selectedFilter = selectedKey;

    if(selectedKey === 'all'){
      this.filteredTodos = [...this.todos];
    } else if(selectedKey === 'actives'){
      this.filteredTodos = this.todos.filter((todo) => !todo.completed);
    } else if(selectedKey === 'completed'){
      this.filteredTodos = this.todos.filter((todo) => todo.completed);
    }
  }

  toggleCompleted(item: TodoModel){
    item.completed = !item.completed;
    this.filter(this.selectedFilter);
  }

  onSelectChange(event: Event){
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.filter(selectedValue as filterType);
  }

}
