import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { initDomAdapter } from '@angular/platform-browser/src/browser';
import { Log } from './log';

export class RestApi<T> {
  constructor(public http: HttpClient) {}

  url: string;
  log: Log = new Log();
  private setType: new (input?: T) => T;

  // configurasi service
  config(url: string, type: new(input?: T) => T) {
    this.url = url;
    this.setType = type;
  }

  // set log id
  setLogId(id: string) {
    this.log.id = id;
  }

  // ambil semua data
  findAll(): Observable<T[]> {
    if (!this.url || !this.setType) {
      this.log.console('You must set config url and setType');
      return of([]);
    } else  {
      return this.http
        .get<T[]>(this.url, {
          headers: new HttpHeaders().set('Authorization', environment.tokenRest)
        })
        .pipe(
          map(_data => {
            const data = _data.map(_set => new this.setType(_set));
            this.log.console('findAll()', data);
            return data;
          })
        );
    }
  }
}
