import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { MyBooksComponent } from './my-books/my-books.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      authenticatinRequired: false
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      authenticatinRequired: false
    }
  },
  {
    path: 'create-book',
    component: CreateComponent,
    data: {
      authenticatinRequired: true
    }
  },
  {
    path: 'my-books', // add ID
    component: MyBooksComponent,
    // data: {
    //   authenticatinRequired: true
    // },
    // children: [
    // ]
  },
  {
    path: 'edit', // add ID
    component: EditComponent
    // data: {
    //   authenticatinRequired: true
    // }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
