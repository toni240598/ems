import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { RestApi } from 'src/cores/rest-api';
import { City } from './city';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Province } from '../province/province';

@Injectable({
  providedIn: 'root'
})
export class CityService extends RestApi<City> {

  constructor(http: HttpClient) {
    super(http);
    this.config(`${environment.host}/api/cities`, City);
  }

  // mencari data cities dengan dihubungkan dengan province
  findCities(): Observable<City[]> {
    this.loading = true;
    return this.http.get<City[]>(`${this.url}?filter=${encodeURIComponent(JSON.stringify({include: ['province']}))}`, {
      headers : new HttpHeaders().set('Authorization', this.getTokenRest())
    }).pipe(
      map(_cities => {
        this.loading = false;
        const data = _cities.map(_city => new City(_city));
        this.data  = data;
        console.log(`[CityService] - findCities()`, this.data);
        return data;
      }),
      catchError(this.handleError)
    );
  }

}
