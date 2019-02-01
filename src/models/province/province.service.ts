import { Injectable} from '@angular/core';
import { RestApi } from 'src/cores/rest-api';
import { Province } from './province';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { TableInterface } from 'src/cores/table';


@Injectable({
  providedIn: 'root'
})
export class ProvinceService extends RestApi<Province> implements TableInterface {

  constructor(http: HttpClient) {
    super(http);
    this.config(`${environment.host}/api/provinces`, Province);
  }

  // merubah value table ke array 2 dimensi biar data nya bisa digunakan di table
  getArrays() {
    return this.data.map(_value => _value.toArray());
  }

}
