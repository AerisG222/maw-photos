import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppSettings } from '@models';
import { BaseSettingsFacade } from './base-settings-facade';
import { SettingsStoreActions, SettingsStoreSelectors } from '@core/root-store';

@Injectable({
    providedIn: 'root'
})
export class AppSettingsFacade extends BaseSettingsFacade<AppSettings> {
    settings$ = this.store.select(SettingsStoreSelectors.appSettings);

    constructor(private store: Store) {
        super();
    }

    save(settings: AppSettings) {
        this.store.dispatch(SettingsStoreActions.saveAppSettings({ settings }));
    }
}
