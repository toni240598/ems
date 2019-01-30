import { Component, OnInit } from '@angular/core';
import { CityService } from 'src/models/city/city.service';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { ProvinceService } from 'src/models/province/province.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styles: []
})
export class CityComponent implements OnInit {

  constructor(
    public cityService: CityService,
    public provinceService: ProvinceService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.cityService.findTokenRest()
      .subscribe(_success => {
         forkJoin(
           this.provinceService.findAll(),
           this.cityService.findCities()
         ).subscribe(
           _result => _result,
           _error => this.toastr.error(_error));
      }, _error => this.toastr.error(_error));
  }
}
