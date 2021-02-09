import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { SettingsStoreActions, SettingsStoreSelectors } from '@core/root-store';
import { BaseSettingsFacade } from './base-settings-facade';
import { SearchListViewSettings } from 'src/app/models/settings/search-list-view-settings';

@Injectable({
    providedIn: 'root'
})
export class SearchListSettingsFacade extends BaseSettingsFacade<SearchListViewSettings> {
    settings$ = this.store.select(SettingsStoreSelectors.searchListViewSettings);

    constructor(private store: Store) {
        super();
    }

    save(settings: SearchListViewSettings): void {
        this.store.dispatch(SettingsStoreActions.saveSearchListViewSettings({ settings }));
    }
}
