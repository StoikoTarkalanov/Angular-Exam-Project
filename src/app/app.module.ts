import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { UserNavModule } from './user-navigation/user.module';
import { UserModule } from './user/user.module';
import { ViewModule } from './views/view.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    CoreModule,
    SharedModule,
    HttpClientModule,
    UserNavModule,
    UserModule,
    ViewModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
