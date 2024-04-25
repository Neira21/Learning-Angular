import { Component, computed, effect, OnInit, signal } from '@angular/core';
import { filterType, TodoModel } from '../../models/todo';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent implements OnInit {
  todoList = signal<TodoModel[]>([]);

  filter = signal<filterType>('all')

  todoListFiltered = computed(()=>{
    const filter = this.filter()
    const todos = this.todoList()

    switch(filter){
      case 'actives':
        return todos.filter(todo => !todo.completed)
      case 'completed':
        return todos.filter(todo => todo.completed)
      default:
        return todos
    }
  })

  constructor() {
    effect(()=>(
      localStorage.setItem('todos', JSON.stringify(this.todoList()))
    ))
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const storage = localStorage.getItem('todos')
    if(storage){
      this.todoList.set(JSON.parse(storage))
    }

  }

  newTodo = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required, Validators.minLength(3)
    ]
  })

  changeFilter(filter: filterType) {
    this.filter.set(filter)
  }

  addTodo = () => {
    const newTodoTitle = this.newTodo.value.trim()
    if(this.newTodo.valid && newTodoTitle !== ''){
      const newTodo = {
        id: Date.now(),
        title: newTodoTitle,
        completed: false
      }
      this.todoList.update((prevsTodo)=>{
        return [
          ...prevsTodo,
          newTodo
        ]
      })
      this.newTodo.reset()
    } else {
      this.newTodo.setValue('')
    }
  }

  toggleTodo = (id: number) => {
    this.todoList.update((prevTodod) => prevTodod.map(todo => {
      return todo.id === id ? {...todo, completed: !todo.completed} : todo
    }))
  }

  removeTodo = (id:number) => {
    this.todoList.update((prevTodo) => prevTodo.filter(todo => todo.id !== id))
  }

  updateTodoEditingMode = (id: number) => {
    this.todoList.update((prev) => prev.map(todo => {
      return todo.id === id ? {...todo, editing: !todo.editing} : todo
    }))
  }

  saveTitleTodo(id: number, event:Event ) {
    const target = (event.target as HTMLInputElement).value
    this.todoList.update((prevTodos) => prevTodos.map(todo => {
      return todo.id === id ? {...todo, title: target, editing: false } : todo
    }))

  }
}
