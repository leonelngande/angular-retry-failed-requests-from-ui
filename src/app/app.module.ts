import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ConnectionStatusModule} from './connection-status/connection-status.module';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ConnectionStatusModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
