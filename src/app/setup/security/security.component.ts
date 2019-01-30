import { Component, OnInit } from '@angular/core';
import { SecurityService } from 'src/models/security/security.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styles: []
})
export class SecurityComponent implements OnInit {

  constructor(
    public securityService: SecurityService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.securityService.findTokenRest().subscribe( _token => {
      this.securityService.findAll()
      .subscribe(
        _data => _data,
        _error => this.toastr.error(_error)
      ), _error => this.toastr.error(_error)
    })
  }
}
