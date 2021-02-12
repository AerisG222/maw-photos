import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { SettingsStoreActions, SettingsStoreSelectors } from '@core/root-store';
import { BaseSettingsFacade } from './base-settings-facade';
import { RandomPageSettings } from '@models';

@Injectable({
    providedIn: 'root'
})
export class RandomPageSettingsFacade extends BaseSettingsFacade<RandomPageSettings> {
    settings$ = this.store.select(SettingsStoreSelectors.randomPageSettings);

    constructor(private store: Store) {
        super();
    }

    save(settings: RandomPageSettings): void {
        this.store.dispatch(SettingsStoreActions.saveRandomPageSettings({ settings }));
    }
}
