import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoaderComponent } from './loader/loader.component';


@NgModule({
  declarations: [
    SidebarComponent,
    FooterComponent,
    HomeComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SidebarComponent,
    FooterComponent,
    HomeComponent
  ]
})
export class CoreModule { }
