import { Component, OnInit } from '@angular/core';
import { ProvinceService } from 'src/models/province/province.service';
import { CityService } from 'src/models/city/city.service';

@Component({
  selector: 'app-root',
  template: `
    Hello World
  `,
  styles: ['']
})
export class AppComponent implements OnInit {

  constructor(
    public provinceService: ProvinceService,
    public cityService: CityService
  ) {
  }

  ngOnInit() {
    this.provinceService.setLogId('[ProvinceService]');
    this.cityService.setLogId('[CityService]');
    this.provinceService.findAll()
      .subscribe();
    this.cityService.findAll()
      .subscribe();
  }

}
