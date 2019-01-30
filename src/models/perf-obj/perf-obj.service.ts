import { Injectable } from "@angular/core";
import { RestApi } from "src/cores/rest-api";
import { PerfObj } from "./perf-obj";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class PerfObjService extends RestApi<PerfObj> {
    constructor(http: HttpClient) {
        super(http)
        this.config(`${environment.host}/api/perfobjects`, PerfObj);
    }
}