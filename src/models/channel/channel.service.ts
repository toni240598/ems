import { RestApi } from "src/cores/rest-api";
import { Injectable } from "@angular/core";
import { Channel } from "./channel";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class ChannelService extends RestApi<Channel> {
    constructor(http: HttpClient) {
        super(http)
        this.config(`${environment.host}/api/channels`, Channel);
    }
}