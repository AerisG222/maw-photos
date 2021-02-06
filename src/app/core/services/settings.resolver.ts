import { Injectable } from '@angular/core';
import {
    Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';

import { SettingsFacade } from '@core/facades/settings-facades';

@Injectable({
    providedIn: 'root'
})
export class SettingsResolver implements Resolve<boolean> {
    constructor(private settingsFacade: SettingsFacade) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        this.settingsFacade.load();

        return of(true);
    }
}
