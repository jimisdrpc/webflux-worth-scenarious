import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppService } from './app.service';
import { SseService } from './sse.service';
import { PollingService } from './polling.service';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule
  ],
  providers: [
    AppService,
    SseService,
    PollingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
