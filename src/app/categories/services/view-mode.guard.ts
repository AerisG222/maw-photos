import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { RouteHelper } from '@models';
import { CategoriesUrlService } from './categories-url.service';

@Injectable()
export class ViewModeGuard implements CanActivate {
    constructor(
        private urlService: CategoriesUrlService,
        private router: Router
    ) {

    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const view = route.params?.view;

        // this should never happen based on where the guard is configured in the
        // router configuration
        if(this.urlService.isValidView(view)) {
            return true;
        }

        return this.urlService.getDefaultView().pipe(
            map(defaultView => this.router.parseUrl(
                RouteHelper.categoriesAbs(defaultView, route.queryParams.year, route.queryParams.type)
            ))
        );
    }
}
