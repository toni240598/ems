import { Component, OnInit } from '@angular/core';
import { PerfObjService } from 'src/models/perf-obj/perf-obj.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-perf-obj',
  templateUrl: './perf-obj.component.html',
  styles: []
})
export class PerfObjComponent implements OnInit {

  constructor(
    public perfObjService: PerfObjService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.perfObjService.findTokenRest().subscribe( _token => {
      this.perfObjService.findAll()
      .subscribe(
        _data => _data,
        _error => this.toastr.error(_error)
      ), _error => this.toastr.error(_error)
    })
  }
}
