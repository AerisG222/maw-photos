import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    UrlTree,
    Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CategoryTypeFilter, RouteHelper } from '@models';
import { CategoryPageSettingsFacade } from '@core/facades/settings/category-page-settings-facade';

@Injectable()
export class ViewModeGuard implements CanActivate {
    constructor(
        private categoryPageSettings: CategoryPageSettingsFacade,
        private router: Router
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        return this.categoryPageSettings.settings$.pipe(
            map(({ viewMode }) =>
                this.router.parseUrl(
                    RouteHelper.categoriesAbs(
                        viewMode,
                        route.queryParams.year as string | number | undefined,
                        route.queryParams.type as CategoryTypeFilter | undefined
                    )
                )
            )
        );
    }
}
