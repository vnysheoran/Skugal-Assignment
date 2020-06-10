import { Component, OnInit } from '@angular/core';
import { Todo} from './todo';
import { FormGroup, FormControl } from '@angular/forms';
import { TodoService} from '../todo.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-theme1',
  templateUrl: './theme1.component.html',
  styleUrls: ['./theme1.component.css'],
  animations: [
    trigger('simpleFadeAnimation', [
        state('in', style({ backgroundColor: '#323232' })),
        transition(':enter', [
          style({ backgroundColor: '#636363' }),
          animate(600 )
        ]),
        transition(':leave',
          animate(600, style({ backgroundColor: '#636363' }))
        )
    ])
  ]
})
export class Theme1Component implements OnInit {

  todos: Todo[];

  todoForm = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(''),
    description: new FormControl(''),
  });

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos(): void {
    this.todoService.getTodos()
        .subscribe(todos => {
          if (this.todos) {
            for (const newTodo of todos) {
              let valueAlreadyPresent = false;
              for (const todo of this.todos) {
                if (todo.id === newTodo.id) {
                  valueAlreadyPresent = true;
                  if (todo.name !== newTodo.name || todo.description !== newTodo.description) {
                    todo.name = newTodo.name;
                    todo.description = newTodo.description;
                  }
                }
              }
              if (!valueAlreadyPresent) {
                this.todos.push(newTodo);
              }
            }

            for (let todo = 0; todo < (this.todos).length; todo++) {
              let valueAlreadyPresent = false;
              for (const newTodo of todos) {
                if (this.todos[todo].id === newTodo.id) {
                  valueAlreadyPresent = true;
                }
              }
              if (!valueAlreadyPresent) {
                this.todos.splice(todo, 1);
              }
            }
          } else {
            this.todos = todos;
          }
        });
  }

  doneTodo(id, status): void {
    this.todoService.updateStatus(id, status);
  }

  editTodo(id, name, description): void {
    this.todoForm.setValue({
      id, name, description
    });
  }

  deleteTodo(id): void {
    this.todoService.deleteTodo(id);
  }

  onSubmit(): void {
    if (this.todoForm.value.id === null) {
      this.todoService.addTodo(this.todoForm.value);
    } else {
      this.todoService.updateTodo(this.todoForm.value);
    }
    this.todoForm.reset();
  }

}
