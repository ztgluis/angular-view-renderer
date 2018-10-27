import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { RoutingModule } from './app.routing';
import { EagerComponents } from './app.routing';

import { AppComponent } from './app.component';

import { ViewService } from './view/view.service';
import { ViewMockService } from './view/view.mock.service';
import { ViewHttpService } from './view/view.http.service';

@NgModule({
  declarations: [
    AppComponent,
    EagerComponents,
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    HttpClientModule
  ],
  providers: [
      ViewService,
      { provide: ViewHttpService, useClass: ViewMockService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
