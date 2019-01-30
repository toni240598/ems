import { Injectable } from "@angular/core";
import { RestApi } from "src/cores/rest-api";
import { Security } from "./security";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class SecurityService extends RestApi<Security> {
    constructor(http: HttpClient) {
        super(http);
        this.config(`${environment.host}/api/securities`, Security);
    }
}
