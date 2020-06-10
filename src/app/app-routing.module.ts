import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Theme1Component } from './theme1/theme1.component';

const routes: Routes = [
  { path: '', component: Theme1Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
