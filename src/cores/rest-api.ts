import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Token } from 'src/models/token/token';

export class RestApi<T> {
  constructor(
    public http: HttpClient
  ) {}

  url: string;
  data: T[] = [];
  loading: boolean;
  private setType: new (input?: T) => T;

  // configurasi service
  config(url: string, type: new(input?: T) => T) {
    this.url = url;
    this.setType = type;
  }

  // ambil semua data
  findAll(): Observable<T[]> {
    this.loading = true;
    if (!this.url || !this.setType) {
      // this.log.console('You must set config url and setType');
      this.loading = false;
      return of([]);
    } else  {
      return this.http
        .get<T[]>(this.url, {
          headers: new HttpHeaders().set('Authorization', this.getTokenRest())
        })
        .pipe(
          map(_data => {
            this.loading = false;
            const data = _data.map(_set => new this.setType(_set));
            this.data = data;
            console.log('[RestAPI] - findAll()', this.data);
            return data;
          }),
          catchError(this.handleError)
        );
    }
  }


  handleError(error: HttpErrorResponse) {
    this.loading = false;
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status} \n Message: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  findTokenRest(): Observable<Token> {
    this.loading = true;
    return this.http
      .post<Token>("https://ngx-ems.auth0.com/oauth/token", {
        client_id: "xp2Ipm3UN1zn2UmXu3SKt7MEjoXNY3g4",
        client_secret: "VVjujTVXLs9tRmXpjZWaEGur0kgSiqELbRmaaVTRE2colMIlinTLzG5tnhGp1XNe",
        audience: "http://ems-satunol.ddns.net/",
        grant_type: "client_credentials"
      }).pipe(
        map(_token => {
          this.loading = false;
          const token = new Token(_token);
          console.log('[RestAPI] - findTokenRest()', token);
          localStorage.setItem("tokenRest", JSON.stringify(token));
          return token;
        }),
        catchError(this.handleError)
      );
  }

  // get token rest
  getTokenRest(): string {
    const localToken = localStorage.getItem('tokenRest');
    const token = localToken ? new Token(JSON.parse(localToken)) : new Token();
    return token.getToken();
  }

}
