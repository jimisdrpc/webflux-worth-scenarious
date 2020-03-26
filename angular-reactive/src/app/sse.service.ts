import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { Extrato } from './extrato';


@Injectable({
  providedIn: "root"
})
export class SseService {
  extratos: Extrato[] = [];
  constructor(private _zone: NgZone) { }

  getServerSentEvent(url: string): Observable<any> {
    this.extratos = [];
    return Observable.create(observer => {
      const eventSource = this.getEventSource(url);
      eventSource.onmessage = event => {
        this._zone.run(() => {
          let json = JSON.parse(event.data);
          this.extratos.push(new Extrato(json['id'], json['description'], json['value'], json['status']));
          observer.next(this.extratos);
        });
      };
      eventSource.onerror = (error) => {
        if (eventSource.readyState === 0) {
          console.log('The stream has been closed by the server.');
          eventSource.close();
          observer.complete();
        } else {
          observer.error('EventSource error: ' + error);
        }
      }

    });
  }
  private getEventSource(url: string): EventSource {
    return new EventSource(url);
  }
}

