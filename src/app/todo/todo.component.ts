import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TodoService} from '../todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todoForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
  });

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.todoService.addTodo(this.todoForm.value);
    this.todoForm.reset();
  }

}
