import { Injectable } from '@angular/core';
import { SensorType } from './sensor-type';
import { RestApi } from 'src/cores/rest-api';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SensorTypeService extends RestApi<SensorType> {

  constructor(http: HttpClient) {
    super(http);
    this.config(`${environment.host}/api/sensor_types`, SensorType);
  }

}
