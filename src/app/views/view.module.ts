import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewRoutingModule } from './view-routing.module';

import { HomeComponent } from './home/home.component';
import { SingleBookComponent } from './single-book/single-book.component';

@NgModule({
  declarations: [
    HomeComponent,
    SingleBookComponent
  ],
  imports: [
    CommonModule,
    ViewRoutingModule
  ],
  providers: []
})
export class ViewModule { }
