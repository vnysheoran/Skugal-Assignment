import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Theme1Component } from './theme1/theme1.component';
import { Theme2Component } from './theme2/theme2.component';
import { Theme3Component } from './theme3/theme3.component';

const routes: Routes = [
  { path: 'theme1', component: Theme1Component },
  { path: 'theme2', component: Theme2Component },
  { path: 'theme3', component: Theme3Component },
  { path: '', redirectTo: '/theme1', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
