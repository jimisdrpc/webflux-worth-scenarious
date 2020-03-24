import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class AppService {

  protected url : string = 'http://localhost:8080/extrato/paged?page=0&size=1';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http
      .get<any[]>(this.url)
      .pipe(map(data => data));
  }

}

