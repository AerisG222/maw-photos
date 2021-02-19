import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';

import { SettingsFacade } from '@core/facades/settings/settings-facades';

@Injectable({
    providedIn: 'root',
})
export class SettingsResolver implements Resolve<boolean> {
    constructor(private settingsFacade: SettingsFacade) {}

    resolve(): Observable<boolean> {
        this.settingsFacade.load();

        return of(true);
    }
}
