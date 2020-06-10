import {Component, OnInit} from '@angular/core';
import {Todo} from './todo';
import {FormControl, FormGroup} from '@angular/forms';
import {TodoService} from '../todo.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {DomSanitizer} from '@angular/platform-browser';
import * as jsPDF from 'jspdf';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

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
  filter = null;

  todoForm = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(''),
    description: new FormControl(''),
  });

  downloadJsonHref: any;

  constructor(private todoService: TodoService, private sanitizer: DomSanitizer) { }

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
          this.generateDownloadJsonUri();
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

  changeFilter(type): void {
    this.filter = type;
  }

  generateDownloadJsonUri(): void {
    const theJSON = JSON.stringify(this.todos);
    this.downloadJsonHref = this.sanitizer.bypassSecurityTrustUrl('data:text/json;charset=UTF-8,' + encodeURIComponent(theJSON));
  }

  downloadPDF(): void {
    const doc = new jsPDF();

    let pdfTable = `<div id="pdfTable"> <h1>Todo List</h1><table>
    <tr><th>Name</th><th>Description</th><th>Status</th></tr>`;
    for (const todo of this.todos){
      pdfTable = `${pdfTable}<tr> <td>${todo.name}</td><td>${todo.description}</td><td>${todo.status}</td> </tr>`;
    }
    pdfTable = `${pdfTable}</table></div>`;


    doc.fromHTML(pdfTable, 15, 15, {
      width: 190
    });

    doc.save('todo.pdf');
  }

  downloadExcel(): void {
    this.exportAsExcelFile(this.todos, 'todo');
  }

  exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    console.log('worksheet', worksheet);
    const workbook: XLSX.WorkBook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    // const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_' + new Date().getTime() + EXCEL_EXTENSION);
  }
}
