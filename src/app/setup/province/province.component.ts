import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { ProvinceService } from "src/models/province/province.service";
import { ToastrService } from "ngx-toastr";
import { Province } from "src/models/province/province";
import { Table, Filter } from "src/cores/table";
import { Subscription } from "rxjs";
import { MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: "app-province",
  templateUrl: "./province.component.html",
  styles: []
})
export class ProvinceComponent extends Table<Province>
  implements OnInit, OnDestroy {
  constructor(
    public provinceService: ProvinceService,
    public toastr: ToastrService
  ) {
    super();
  }

  private subsribtion: Subscription = new Subscription();
  @ViewChild(MatSort) private sort;

  ngOnInit() {
    this.provinceService.findTokenRest().subscribe(
      _token => {
        this.provinceService
          .findAll()
          .subscribe(
            _data => this.configTable(),
            _error => this.toastr.error(_error)
          );
      },
      _error => this.toastr.error(_error)
    );
  }

  ngOnDestroy() {
    this.subsribtion.unsubscribe();
  }


  // // ambil data ke server
  // private getRestApi(): Subscription {

  // }

  // configuration table
  private configTable() {
    const filters: Filter[] = [
      { column: "label", label: "Label" },
      { column: "latitude", label: "Latitude" },
      { column: "longitude", label: "Longitde" },
      { column: "zoom", label: "Zoom" }
    ];
    this.config(
      ["id", "label", "latitude", "longitude", "zoom"],
      filters,
      [
        ...this.provinceService.data,
        ...this.provinceService.data,
        ...this.provinceService.data,
        ...this.provinceService.data
      ],
      this.provinceService.getArrays(),
      this.sort
    );
  }

  // status loading berdasarkan banyak nya service yang di pakai
  getLoading(): Boolean {
    return this.provinceService.loading;
  }

}
