import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageV1Component } from './pages/page-v1/page-v1.component';
import { MapViewComponent } from './other/map-view/map-view.component';
import { PageSetupComponent } from './pages/page-setup/page-setup.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'v1' },
  {
    path: 'v1',
    component: PageV1Component,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'setup' },
      { path: 'map', component: MapViewComponent },
      { path: 'setup', component: PageSetupComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
