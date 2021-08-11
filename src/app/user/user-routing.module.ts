import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { MyBooksComponent } from './my-books/my-books.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { LoggedUserGuard } from '../core/guards/logged-user/logged-user.guard';
import { GuestUserGuard } from '../core/guards/guest-user/guest-user.guard';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [LoggedUserGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoggedUserGuard]
  },
  {
    path: 'create-book',
    component: CreateComponent,
    canActivate: [GuestUserGuard]
  },
  {
    path: 'my-books',
    component: MyBooksComponent,
    canActivate: [GuestUserGuard]
  },
  {
    path: 'edit/:id',
    component: EditComponent,
    canActivate: [LoggedUserGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
