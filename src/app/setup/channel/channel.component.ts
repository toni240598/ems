import { Component, OnInit } from '@angular/core';
import { ChannelService } from 'src/models/channel/channel.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styles: []
})
export class ChannelComponent implements OnInit {

  constructor(
    public channelService: ChannelService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.channelService.findTokenRest().subscribe( _token => {
      this.channelService.findAll()
      .subscribe(
        _data => _data,
        _error => this.toastr.error(_error)
      ), _error => this.toastr.error(_error)
    })
  }

}
