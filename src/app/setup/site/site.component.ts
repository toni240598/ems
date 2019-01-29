import { Component, OnInit } from '@angular/core';
import { SiteService } from 'src/models/site/site.service';
import { DistrictService } from 'src/models/district/district.service';
import { CityService } from 'src/models/city/city.service';
import { ProvinceService } from 'src/models/province/province.service';
import { forkJoin } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styles: []
})
export class SiteComponent implements OnInit {

  constructor(
    public siteService: SiteService,
    public districtService: DistrictService,
    public cityService: CityService,
    public provinceService: ProvinceService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.siteService.findTokenRest().subscribe( _success => {
      forkJoin(
        this.provinceService.findAll(),
        this.cityService.findCities(),
        this.districtService.findDistricts(),
        this.siteService.findSites()
      ).subscribe(
        _result => _result,
        _error => this.toastr.error(_error)
      )
    }, _error => this.toastr.error(_error));
  }

}
