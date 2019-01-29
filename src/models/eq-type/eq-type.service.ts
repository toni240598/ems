import { Injectable } from "@angular/core";
import { RestApi } from "src/cores/rest-api";
import { EqType } from "./eq-type";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class EqTypeService extends RestApi<EqType> {
    constructor(http: HttpClient) {
        super(http)
        this.config(`${environment.host}/api/equipmenttype`, EqType);
    }
}