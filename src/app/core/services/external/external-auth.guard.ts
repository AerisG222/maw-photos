import { Injectable } from '@angular/core';
import { RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { OidcFacade } from 'ng-oidc-client';
import { Observable, of } from 'rxjs';
import { take, switchMap } from 'rxjs/operators';

import { AuthGuard } from '../auth.guard';

@Injectable()
export class ExternalAuthGuard implements AuthGuard {
    constructor(private router: Router, private oidcFacade: OidcFacade) { }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        return this.oidcFacade.identity$.pipe(
            take(1),
            switchMap(user => {
                console.log('Auth Guard - Checking if user exists', user);
                console.log('Auth Guard - Checking if user is expired:', user && user.expired);
                if (user && !user.expired) {
                    return of(true);
                } else {
                    this.router.navigate(['/login']);
                    return of(false);
                }
            })
        );
    }
}
