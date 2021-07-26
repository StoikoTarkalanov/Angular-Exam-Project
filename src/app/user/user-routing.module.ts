import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MyBooksComponent } from './my-books/my-books.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  {
    path: 'my-books',
    component: MyBooksComponent
  },
  {
    path: 'create-book',
    component: CreateComponent
  },
  {
    path: 'edit',
    component: EditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
