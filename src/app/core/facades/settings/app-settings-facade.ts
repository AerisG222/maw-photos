import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppSettings } from 'src/app/models/settings/app-settings';
import { BaseSettingsFacade } from './base-settings-facade';
import { SettingsStoreActions, SettingsStoreSelectors } from '@core/root-store';

@Injectable({
    providedIn: 'root'
})
export class AppSettingsFacade implements BaseSettingsFacade<AppSettings> {
    settings$ = this.store.select(SettingsStoreSelectors.appSettings);

    constructor(private store: Store) { }

    save(settings: AppSettings) {
        this.store.dispatch(SettingsStoreActions.saveAppSettings({ settings }));
    }
}
