import { Component, OnInit } from '@angular/core';
import { DistrictService } from 'src/models/district/district.service';
import { CityService } from 'src/models/city/city.service';
import { ProvinceService } from 'src/models/province/province.service';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styles: []
})
export class DistrictComponent implements OnInit {

  constructor(
    public districtService: DistrictService,
    public cityService: CityService,
    public provinceService: ProvinceService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.districtService.findTokenRest().subscribe(_success => {
      forkJoin(
        this.provinceService.findAll(),
        this.cityService.findCities(),
        this.districtService.findAll(),
        this.districtService.findDistricts()
      ).subscribe(
        _result => _result,
        _error => this.toastr.error(_error)
      )
    }, _error => this.toastr.error(_error));
  }
}