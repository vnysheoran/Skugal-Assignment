import { Component, OnInit } from '@angular/core';
import { Todo} from "./todo";
import { FormGroup, FormControl } from '@angular/forms';
import { TodoService} from '../todo.service';

@Component({
  selector: 'app-theme1',
  templateUrl: './theme1.component.html',
  styleUrls: ['./theme1.component.css']
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
        .subscribe(todos => this.todos = todos);
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
    console.log(this.todoForm.value);
    if (this.todoForm.value.id === null) {
      this.todoService.addTodo(this.todoForm.value);
    } else {
      this.todoService.updateTodo(this.todoForm.value);
    }
    this.todoForm.reset();
  }

}
