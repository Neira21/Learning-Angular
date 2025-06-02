import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { filterType, IfilterTypeObject, TodoModel } from '../models/todo';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrl: './container.component.css',
})
export class ContainerComponent {

  //array de objetos con el interface TodoModel
  todos: TodoModel[] = [
    { id: 1, title: 'Tarea Nueva', completed: true },
    { id: 2, title: 'Tarea 2', completed: true },
    { id: 3, title: 'Tarea 3', completed: false },
    { id: 4, title: 'Tarea 4', completed: true },
    { id: 5, title: 'Tarea 5', completed: false },
  ];

  filteredTodos: TodoModel[] = [...this.todos];
  selectedFilter: string = 'all'; // Filtro por defecto


  readonly ListObject: IfilterTypeObject[] = [
    { key: 'all', value: 'Todos' },
    { key: 'actives', value: 'Activos' },
    { key: 'completed', value: 'Completados' },
  ];

  filter(selectedKey: string) {
    this.selectedFilter = selectedKey;

    if (selectedKey === 'all') {
      this.filteredTodos = [...this.todos]; // Mostrar todos
    } else if (selectedKey === 'actives') {
      this.filteredTodos = this.todos.filter((todo) => !todo.completed); // Solo tareas activas
    } else if (selectedKey === 'completed') {
      this.filteredTodos = this.todos.filter((todo) => todo.completed); // Solo tareas completadas
    }
  }

  toggleCompleted(item: TodoModel) {
    item.completed = !item.completed;
    this.filter(this.selectedFilter); // Actualizar la lista filtrada
  }

  onSelectChange(event: Event) {
    console.log("event",event.currentTarget)
    const selectedValue = (event.target as HTMLSelectElement).value;
    console.log("convertido",selectedValue)
    this.filter(selectedValue);
  }

  texto = '';

  cambiarValor() {
    this.texto = 'Hola Mundo';
  }
}
