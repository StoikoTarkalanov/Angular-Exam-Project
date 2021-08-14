import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';
import { NetworkLoadInterceptor } from '../shared/interceptors/network-load/network-load.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ],
  exports: [SpinnerComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: NetworkLoadInterceptor, multi: true }
  ]
})
export class SharedModule { }
