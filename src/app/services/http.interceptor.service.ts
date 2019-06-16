import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse,
    HttpHandler,
    HttpEvent,
    HttpHeaders
} from '@angular/common/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable({
    providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        // console.log('processing request', request);

        // const customReq = request.clone({});
        const customReq = request.clone({
            setHeaders: {
                // 'Content-Type': 'application/json',
                // Authorization: 'bearer ' + 'accessToken',
            },

        });

        return next
            .handle(customReq)
            .do((ev: HttpEvent<any>) => {
                if (ev instanceof HttpResponse) {
                    // console.log('processing response', ev);
                }
            })
            .catch(response => {
                if (response instanceof HttpErrorResponse) {
                    // console.log('Processing http error', response);
                }

                return Observable.throw(response);
            });
    }
}
