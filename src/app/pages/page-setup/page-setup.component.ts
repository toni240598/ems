import { Component, OnInit } from '@angular/core';
import { Page } from 'src/app/shared/menu/menu.component';
import { ProvinceComponent } from 'src/app/setup/province/province.component';
import { CityComponent } from 'src/app/setup/city/city.component';

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
    { title: 'City', image: 'location.png', component: CityComponent }
  ];

  ngOnInit() {
  }

}
