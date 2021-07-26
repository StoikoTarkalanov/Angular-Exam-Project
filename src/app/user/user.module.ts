import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { MyBooksComponent } from './my-books/my-books.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [
    MyBooksComponent,
    CreateComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ],
  providers: []
})
export class UserModule { }
