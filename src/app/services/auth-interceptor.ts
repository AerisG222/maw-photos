import { Observable } from 'rxjs';
import { Injectable, Inject } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { AuthService, AUTH_SERVICE } from './auth.service';

// https://blog.angular-university.io/angular-jwt-authentication/

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(@Inject(AUTH_SERVICE) private _authService: AuthService) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({
            headers: req.headers.set('Authorization', this._authService.getAuthorizationHeaderValue())
        });

        return next.handle(req);
    }
}
