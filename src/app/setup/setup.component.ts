import { Component, OnInit } from '@angular/core';
import { ProvinceComponent } from './province/province.component';
import { CityComponent } from './city/city.component';
import { DistrictComponent } from './district/district.component';
import { SiteComponent } from './site/site.component';
import { EqTypeComponent } from './eq-type/eq-type.component';
import { PerfObjectComponent } from './perf-object/perf-object.component';
import { SensorTypeComponent } from './sensor-type/sensor-type.component';
import { SecurityComponent } from './security/security.component';
import { Page } from '../shared/menu/menu.component';

@Component({
  selector: 'app-setup',
  template: `
     <app-menu [pages]="pages" [localIndexId]="'setupPageIndex'"></app-menu>
  `,
  styles: []
})
export class SetupComponent implements OnInit {

  constructor() { }
  pages: Page[] = [
    { title: 'Province', image: 'location.png', component: ProvinceComponent },
    { title: 'City', image: 'location.png', component: CityComponent },
    { title: 'District', image: 'location.png', component: DistrictComponent },
    { title: 'Site', image: 'location.png', component: SiteComponent },
    { title: 'Equipment Type', image: 'equipment.png', component: EqTypeComponent },
    { title: 'Perfomance Object', image: 'perf-object.png', component: PerfObjectComponent },
    { title: 'Sensor Type', image: 'sensor-type.png', component: SensorTypeComponent },
    { title: 'Security', image: 'security.png', component: SecurityComponent }
  ];

  ngOnInit() {
  }

}
