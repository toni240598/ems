import { Component, OnInit } from '@angular/core';
import { SecuritySiteService } from 'src/models/security-site/security-site.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-security-site',
  templateUrl: './security-site.component.html',
  styles: []
})
export class SecuritySiteComponent implements OnInit {

  constructor(
    public securitySiteService: SecuritySiteService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.securitySiteService.findTokenRest().subscribe( _token => {
      this.securitySiteService.findAll()
      .subscribe(
        _data => _data,
        _error => this.toastr.error(_error)
      ), _error => this.toastr.error(_error)
    })
  }
}
