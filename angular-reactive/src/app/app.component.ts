import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { SseService } from './sse.service';
import { Extrato } from './extrato';
import { Observable, timer, interval, of } from 'rxjs';


import { concatMap, map, tap, switchMap, takeUntil } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [SseService],
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  extratos$: Observable<any>;

  title = 'angular-reactive';

  restItems: any;

  polledTransacaoStatus$: Observable<string>;
  pollingData: any;
  private doctors = [];

  constructor(private appService: AppService, private sseService: SseService, private http: HttpClient) { }

  ngOnInit() {
    this.getRestItems();
    this.getExtratoStream();

    const status$ = this.http.get('http://localhost:8080/extrato/1');

    this.pollingData = interval(5000)
      .pipe(
        switchMap((_: number) => status$),
        takeUntil(timer(60000)),
      ).subscribe(
        (data: any) => console.log(data),
        (error: any) => console.log(error)
      );

  }

  ngOnDestroy() {
    this.pollingData.unsubscribe();
  }

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



}





