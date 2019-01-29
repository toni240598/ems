import { Component, OnInit } from '@angular/core';
import { Page } from 'src/app/shared/menu/menu.component';
import { ProvinceComponent } from 'src/app/setup/province/province.component';
import { CityComponent } from 'src/app/setup/city/city.component';
import { DistrictComponent } from 'src/app/setup/district/district.component';
import { SiteComponent } from 'src/app/setup/site/site.component';
import { EqTypeComponent } from 'src/app/setup/eq-type/eq-type.component';
import { PerfObjComponent } from 'src/app/setup/perf-obj/perf-obj.component';
import { SecurityComponent } from 'src/app/setup/security/security.component';
import { ChannelComponent } from 'src/app/setup/channel/channel.component';

@Component({
  selector: 'app-page-setup',
  template: `
    <app-menu [pages]="pages"></app-menu>
  `,
  styles: []
})
export class PageSetupComponent implements OnInit {

  constructor() { }
  pages: Page[] = [
    { title: 'Province', image: 'location.png', component: ProvinceComponent },
    { title: 'City', image: 'location.png', component: CityComponent },
    { title: 'District', image: 'location.png', component: DistrictComponent },
    { title: 'Site', image: 'location.png', component: SiteComponent },
    { title: 'Equipment Type', image: 'location.png', component: EqTypeComponent },
    { title: 'Perfomance Object', image: 'location.png', component: PerfObjComponent },
    { title: 'Security', image: 'location.png', component: SecurityComponent },
    { title: 'Channel', image: 'location.png', component: ChannelComponent }
  ];

  ngOnInit() {
  }

}
