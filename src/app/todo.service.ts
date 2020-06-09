import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

import { Todo, Todos } from './todo/todo';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private firestore: AngularFirestore) { }

  getTodos(): Observable<any[]> {
    return this.firestore.collection('todo').snapshotChanges()
        .pipe(
            map(res => {
              return res.map(element => {
                return element.payload.doc.data();
              });
            }));
  }

  addTodo(formResult): void {
    const data = {
      name: formResult.name,
      description: formResult.description,
      status: false
    };
    this.firestore.collection('todo')
        .add(data)
        .then(res => {
          console.log(res);
        }, err => {
          console.log(err);
        });
  }
}
