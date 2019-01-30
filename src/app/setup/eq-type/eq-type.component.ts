import { Component, OnInit } from '@angular/core';
import { EqTypeService } from 'src/models/eq-type/eq-type.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-eq-type',
  templateUrl: './eq-type.component.html',
  styles: []
})
export class EqTypeComponent implements OnInit {

  constructor(
    public eqTypeService: EqTypeService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.eqTypeService.findTokenRest().subscribe(_token => {
      this.eqTypeService.findAll()
      .subscribe(
        _data => _data,
        _error => this.toastr.error(_error)
      );
    }, _error => this.toastr.error(_error));
  }
}
