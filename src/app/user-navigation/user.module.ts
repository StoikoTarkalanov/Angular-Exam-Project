import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
    UserNavRoutingModule,
  ],
  providers: []
})
export class UserNavModule { }
