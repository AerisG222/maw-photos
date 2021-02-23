import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { RouteHelper } from '@models';
import { RandomPageSettingsFacade } from '@core/facades/settings/random-page-settings-facade';

@Injectable()
export class ViewModeGuard implements CanActivate {
    constructor(
        private randomPageSettings: RandomPageSettingsFacade,
        private router: Router
    ) {}

    canActivate():
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        return this.randomPageSettings.settings$.pipe(
            map(({ viewMode }) =>
                this.router.parseUrl(RouteHelper.randomAbs(viewMode))
            )
        );
    }
}
