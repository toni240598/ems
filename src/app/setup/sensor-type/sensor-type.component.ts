import { Component, OnInit } from '@angular/core';
import { SensorTypeService } from 'src/models/sensor-type/sensor-type.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sensor-type',
  templateUrl: './sensor-type.component.html',
  styles: []
})
export class SensorTypeComponent implements OnInit {

  constructor(
    public sensorTypeService: SensorTypeService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.sensorTypeService.findTokenRest()
      .subscribe(_token => {
          this.sensorTypeService.findAll()
          .subscribe(_sensors => _sensors, _error => this.toastr.error(_error));
      }, _err => this.toastr.error(_err));
  }

}
