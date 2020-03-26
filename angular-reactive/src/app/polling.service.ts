import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { Observable, interval, timer } from 'rxjs';

@Injectable()
export class PollingService {

    constructor(private http: HttpClient) { }

    getStatusInterval() {

        const status$ = this.http.get('http://localhost:8080/extrato/1');

        return interval(5000)
            .pipe(
                switchMap((_: number) => status$),
                takeUntil(timer(60000)),
            )
            .pipe(map(data => data));
        // .subscribe(
        //     (data: any) => console.log(data),
        //     (error: any) => console.log(error)
        // );
    }

}