//ANGULAR
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//SERVICES
import { AppService } from './app.service';
import { SseService } from './sse.service';
import { PollingService } from './polling.service';

//MODELS
import { Extrato } from './extrato';

//RXJS
import { Observable, timer, interval, of } from 'rxjs';
import { concatMap, map, tap, switchMap, takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  extratos$: Observable<any>;
  polledTransacaoStatus$: Observable<any>;

  restItems: any;

  constructor(private appService: AppService,
    private sseService: SseService,
    private pollingService: PollingService,
    private http: HttpClient) { }

  ngOnInit() {
    this.getRestItems();
    this.getExtratoStream();
    this.getPollingDataWithInterval();
  }

  // ngOnDestroy() {
  //   this.pollingData.unsubscribe();
  // }

  getRestItems(): void {
    this.appService.getAll()
      .subscribe(
        restItems => {
          this.restItems = restItems;
        }
      )
  }


  getExtratoStream(): void {
    this.extratos$ = this.sseService
      .getServerSentEvent("http://localhost:8080/extrato");
  }

  getPollingDataWithInterval(): void {

    this.polledTransacaoStatus$ = this.pollingService.getStatusInterval();
  }

}





