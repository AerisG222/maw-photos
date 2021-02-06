import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { SettingsStoreActions, SettingsStoreSelectors } from '@core/root-store';
import { BaseSettingsFacade } from './base-settings-facade';
import { RandomPageSettings } from 'src/app/models/settings/random-page-settings';

@Injectable({
    providedIn: 'root'
})
export class RandomPageSettingsFacade implements BaseSettingsFacade<RandomPageSettings> {
    settings$ = this.store.select(SettingsStoreSelectors.randomPageSettings);

    constructor(private store: Store) { }

    save(settings: RandomPageSettings): void {
        this.store.dispatch(SettingsStoreActions.saveRandomPageSettings({ settings }));
    }
}
