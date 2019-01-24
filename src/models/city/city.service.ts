import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestApi } from 'src/cores/rest-api';
import { City } from './city';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CityService extends RestApi<City> {

  constructor(http: HttpClient) {
    super(http);
    this.config(`${environment.host}/api/cities`, City);
  }


}
