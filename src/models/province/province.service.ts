import { Injectable} from '@angular/core';
import { RestApi } from 'src/cores/rest-api';
import { Province } from './province';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProvinceService extends RestApi<Province> {

  constructor(http: HttpClient) {
    super(http);
    this.config(`${environment.host}/api/provinces`, Province);
  }

}
