import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { SettingsStoreActions, SettingsStoreSelectors } from '@core/root-store';
import { BaseSettingsFacade } from './base-settings-facade';
import { SearchGridViewSettings } from 'src/app/models/settings/search-grid-view-settings';

@Injectable({
    providedIn: 'root'
})
export class SearchGridSettingsFacade extends BaseSettingsFacade<SearchGridViewSettings> {
    settings$ = this.store.select(SettingsStoreSelectors.searchGridViewSettings);

    constructor(private store: Store) {
        super();
    }

    save(settings: SearchGridViewSettings): void {
        this.store.dispatch(SettingsStoreActions.saveSearchGridViewSettings({ settings }));
    }
}
