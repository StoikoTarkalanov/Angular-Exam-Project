import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UserNavRoutingModule } from './user-routing.module';
import { RegisterComponent } from './register/register/register.component';
import { LoginComponent } from './login/login/login.component';

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserNavRoutingModule,
  ],
  providers: []
})
export class UserNavModule { }
