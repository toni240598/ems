import { Injectable } from "@angular/core";
import { RestApi } from "src/cores/rest-api";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { PerfObject } from './perf-object';

@Injectable({
    providedIn: 'root'
})

export class PerfObjectService extends RestApi<PerfObject> {
    constructor(http: HttpClient) {
        super(http);
        this.config(`${environment.host}/api/perfobjects`, PerfObject);
    }
}
