import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from "ngx-toastr";
import { HttpClientModule } from '@angular/common/http';
import { PageV1Component } from './pages/page-v1/page-v1.component';
import { PageSetupComponent } from './pages/page-setup/page-setup.component';
import { ProvinceComponent } from './setup/province/province.component';
import { FormProvinceComponent } from './setup/province/form-province/form-province.component';
import { MapComponent } from './shared/map/map.component';
import { MapViewComponent } from './other/map-view/map-view.component';
import { LoginComponent } from './other/login/login.component';
import { MaterialModule } from './material.module';
import { MenuComponent } from './shared/menu/menu.component';
import { ImageDirective } from './shared/image.directive';
import { CityComponent } from './setup/city/city.component';

@NgModule({
  declarations: [
    AppComponent,

    // pages
    PageV1Component,
    PageSetupComponent,

    // setup
    ProvinceComponent,
    FormProvinceComponent,

    // shared
    MapComponent,
    MenuComponent,

    // other
    MapViewComponent,
    LoginComponent,
    ImageDirective,
    CityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    // tools
    ToastrModule.forRoot({
      closeButton : true,
      tapToDismiss: true,
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true
    })
  ],
  entryComponents: [
    // setup
    ProvinceComponent,
    CityComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
