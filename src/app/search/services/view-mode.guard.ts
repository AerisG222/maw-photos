import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { RouteHelper } from '@models';
import { SearchPageSettingsFacade } from '@core/facades/settings/search-page-settings-facade';

@Injectable()
export class ViewModeGuard implements CanActivate {
    constructor(
        private searchPageSettings: SearchPageSettingsFacade,
        private router: Router
    ) {}

    canActivate():
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        return this.searchPageSettings.settings$.pipe(
            map(({ viewMode }) =>
                this.router.parseUrl(RouteHelper.searchAbs(viewMode))
            )
        );
    }
}
