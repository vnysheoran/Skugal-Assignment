import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  showLoader = false;
  constructor(private firestore: AngularFirestore, private toastr: ToastrService) { }

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
            this.toastr.success(`${data.name}`, 'Todo Added', { timeOut: 2000, closeButton: true, progressBar: true });
        }, err => {
            this.showLoader = false;
            this.toastr.error(`${data.name}`, 'Error while adding todo', { timeOut: 2000, closeButton: true, progressBar: true });
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
              this.toastr.success(`${status}`, 'Todo Status Updated', { timeOut: 2000, closeButton: true, progressBar: true });
          }).catch(e => {
              this.showLoader = false;
              this.toastr.error(`${status}`, 'Error while updating todo status', { timeOut: 2000, closeButton: true, progressBar: true });
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
            this.toastr.success(`${data.name}`, 'Todo Updated', { timeOut: 2000, closeButton: true, progressBar: true });
        }).catch(e => {
            this.showLoader = false;
            this.toastr.error(`${data.name}`, 'Error while updating todo', { timeOut: 2000, closeButton: true, progressBar: true });
        });
  }

  deleteTodo(id): void {
      this.showLoader = true;
      this.firestore
          .collection('todo')
          .doc(id)
          .delete()
          .then((res) => {
              console.log(res);
              this.showLoader = false;
              this.toastr.info(`This action cannot be undone`, 'Todo Deleted', { timeOut: 2000, closeButton: true, progressBar: true });
          }).catch(e => {
              this.showLoader = false;
              // tslint:disable-next-line:max-line-length
              this.toastr.error(`Your todo is still with us`, 'Error while deleting todo', { timeOut: 2000, closeButton: true, progressBar: true });
          });
  }
}
