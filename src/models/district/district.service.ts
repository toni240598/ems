import { Injectable } from "@angular/core";
import { RestApi } from "src/cores/rest-api";
import { District } from "./district";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})

export class DistrictService extends RestApi<District> {
    constructor(http: HttpClient) {
        super(http)
        this.config(`${environment.host}/api/districts`, District);
    }

    findDistricts(): Observable<District[]> {
        this.loading = true;
        return this.http.get<District[]>(`${this.url}?filter=${encodeURIComponent(
            JSON.stringify({
              include: { relation: 'city', scope: { include: ['province'] } },
              order: 'label'
            })
        )}`, {
            headers: new HttpHeaders().set('Authorization', this.getTokenRest())
        }).pipe(
            map(_district => {
                this.loading = false;
                const data = _district.map(_district => new District(_district));
                this.data = data;
                console.log(`[DistrictService] - findDistricts()`, this.data);
                return data;
            }),
            catchError(this.handleError)
        );
    }
}