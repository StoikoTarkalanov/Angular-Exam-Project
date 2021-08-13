import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewRoutingModule } from './view-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NetworkLoadInterceptor } from '../shared/interceptors/network-load/network-load.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { HomeComponent } from './home/home.component';
import { SingleBookComponent } from './single-book/single-book.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    HomeComponent,
    SingleBookComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    ViewRoutingModule,
    MatProgressSpinnerModule,
    NgxPaginationModule
  ],
  exports: [SingleBookComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: NetworkLoadInterceptor, multi: true }
  ]
})
export class ViewModule { }
