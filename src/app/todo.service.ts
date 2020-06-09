import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Todo, Todos } from './todo/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor() { }

  getTodos(): Observable<Todo[]> {
    return of (Todos);
  }

  addTodo(formResult): void {
    Todos.push({
      id: 10,
      name: formResult.name,
      description: formResult.description,
      status: false
    });
  }
}
