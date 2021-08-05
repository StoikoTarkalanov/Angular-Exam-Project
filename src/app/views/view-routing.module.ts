import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SingleBookComponent } from './single-book/single-book.component';

const routes: Routes = [
  {
    path: 'single-book',
    component: SingleBookComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ViewRoutingModule { }
