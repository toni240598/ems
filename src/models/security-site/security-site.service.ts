import { Injectable } from "@angular/core";
import { RestApi } from "src/cores/rest-api";
import { SecuritySite } from "./security-site";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class SecuritySiteService extends RestApi<SecuritySite> {
    constructor(http: HttpClient) {
        super(http)
        this.config(`${environment.host}/api/security_sites`, SecuritySite);
    }
}