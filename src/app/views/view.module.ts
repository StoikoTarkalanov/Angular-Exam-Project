import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewRoutingModule } from './view-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';

import { HomeComponent } from './home/home.component';
import { SingleBookComponent } from './single-book/single-book.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    HomeComponent,
    SingleBookComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    ViewRoutingModule,
    NgxPaginationModule,
    SharedModule
  ],
  exports: []
})
export class ViewModule { }
