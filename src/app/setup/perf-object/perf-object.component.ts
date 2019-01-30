import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PerfObjectService } from 'src/models/perf-object/perf-object.service';

@Component({
  selector: 'app-perf-object',
  templateUrl: './perf-object.component.html',
  styles: []
})
export class PerfObjectComponent implements OnInit {

  constructor(
    public perfObjService: PerfObjectService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.perfObjService.findTokenRest().subscribe( _token => {
      this.perfObjService.findAll()
      .subscribe(
        _data => _data,
        _error => this.toastr.error(_error)
      );
    }, _error => this.toastr.error(_error));
  }

}
