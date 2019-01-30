import { Injectable } from "@angular/core";
import { RestApi } from "src/cores/rest-api";
import { Site } from "./site";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})

export class SiteService extends RestApi<Site> {
    constructor(http: HttpClient) {
        super(http)
        this.config(`${environment.host}/api/sites`, Site);
    }

    findSites(): Observable<Site[]> {
        this.loading = true
        return this.http.get<Site[]>(`${this.url}?filter=${encodeURIComponent(
            JSON.stringify({
                include: {
                    relation: 'district',
                    scope: {
                        include: {
                            relation: 'city',
                            scope: {
                                include: ['province']
                            }
                        }
                    }
                }, order: 'label'
            })
        )}`, {
            headers: new HttpHeaders().set('Authorization', this.getTokenRest())
        }).pipe(
            map(_site => {
                this.loading = false;
                const data = _site.map(_site => new Site(_site));
                this.data = data;
                console.log(`[SiteService] - findSites()`, this.data);
                return data;
            }),
            catchError(this.handleError)
        )
    }
}