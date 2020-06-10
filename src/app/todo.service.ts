import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  showLoader = false;
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
    this.showLoader = true;
    const dbData = {
      name: data.name,
      description: data.description,
      status: false
    };
    this.firestore.collection('todo')
        .add(dbData)
        .then(res => {
            this.showLoader = false;
        }, err => {
            this.showLoader = false;
        });
  }

  updateStatus(id, status): void {
      this.showLoader = true;
      this.firestore
          .collection('todo')
          .doc(id)
          .update({ status })
          .then(res => {
              this.showLoader = false;
          }).catch(e => {
              this.showLoader = false;
          });
  }

  updateTodo(data): void {
    this.showLoader = true;
    this.firestore
        .collection('todo')
        .doc(data.id)
        .update({ name: data.name, description: data.description })
        .then(res => {
            this.showLoader = false;
        }).catch(e => {
            this.showLoader = false;
        });
  }

  deleteTodo(id): void {
      this.showLoader = true;
      this.firestore
          .collection('todo')
          .doc(id)
          .delete()
          .then(res => {
              this.showLoader = false;
          }).catch(e => {
              this.showLoader = false;
          });
  }
}
