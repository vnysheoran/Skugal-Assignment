import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

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
                const d = element.payload.doc.data();
                Object.assign(d, { id: element.payload.doc.id});
                return d;
              });
            }));
  }

  addTodo(data): void {
    const dbData = {
      name: data.name,
      description: data.description,
      status: false
    };
    this.firestore.collection('todo')
        .add(dbData)
        .then(res => {
          console.log(res);
          // TODO add loading
        }, err => {
          console.log(err);
        });
  }

  updateStatus(id, status): void {
      this.firestore
          .collection('todo')
          .doc(id)
          .update({ status })
          .then(res => {
              // TODO loader
          }).catch(e => {
              // TODO Error handle
          });
  }

  updateTodo(data): void {
    this.firestore
        .collection('todo')
        .doc(data.id)
        .update({ name: data.name, description: data.description })
        .then(res => {
            // TODO loader
        }).catch(e => {
        // TODO Error handle
        });
  }

  deleteTodo(id): void {
      this.firestore
          .collection('todo')
          .doc(id)
          .delete()
          .then(res => {
          // TODO loader
          }).catch(e => {
              // TODO Error handle
          });
  }
}
