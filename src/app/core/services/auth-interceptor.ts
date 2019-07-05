import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { OidcFacade } from 'ng-oidc-client';
import { switchMap } from 'rxjs/operators';

// https://blog.angular-university.io/angular-jwt-authentication/

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    static OidcInterceptorService: any;
    constructor(private oidcFacade: OidcFacade) { }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return this.oidcFacade.identity$.pipe(
            switchMap(user => {
                if (user && user.access_token) {
                    req = req.clone({
                        setHeaders: {
                            Authorization: `Bearer ${user.access_token}`
                        }
                    });
                }
                return next.handle(req);
            })
        );
    }
}
