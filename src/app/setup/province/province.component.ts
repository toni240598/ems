import { Component, OnInit } from '@angular/core';
import { ProvinceService } from 'src/models/province/province.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-province',
  templateUrl: './province.component.html',
  styles: []
})
export class ProvinceComponent implements OnInit {

  constructor(
    public provinceService: ProvinceService,
    public toastr: ToastrService
  ) { }

  ngOnInit() {
    this.provinceService.findTokenRest().subscribe(_token => {
      this.provinceService.findAll()
      .subscribe(
        _data => _data,
        _error => this.toastr.error(_error)
      );
    }, _error => this.toastr.error(_error));
  }

}
