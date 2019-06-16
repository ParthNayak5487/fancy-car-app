import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class Api {
    jsonType = 'application/json';

    constructor(public http: HttpClient) { }

    get(endpoint: string, params?: any, reqOpts?: any) {
        if (!reqOpts) {
            reqOpts = {
                params: new HttpParams()
            };
        }

        // Support easy query params for GET requests
        if (params) {
            reqOpts.params = new HttpParams();
            // tslint:disable-next-line:forin
            for (const k in params) {
                reqOpts.params.set(k, params[k]);
            }
        }

        return this.http.get(endpoint, reqOpts);
    }

    post(endpoint: string, body: any, reqOpts?: any) {
        return this.http.post(endpoint, body, reqOpts);
    }

    postFeedback(endpoint: string, body: any, reqOpts?: any) {
        return this.http.post(endpoint, body, reqOpts);
    }

    put(endpoint: string, body: any, reqOpts?: any) {
        return this.http.put(endpoint, body, reqOpts);
    }

    delete(endpoint: string, reqOpts?: any) {
        return this.http.delete(endpoint, reqOpts);
    }

    patch(endpoint: string, body: any, reqOpts?: any) {
        return this.http.put(endpoint, body, reqOpts);
    }
}
