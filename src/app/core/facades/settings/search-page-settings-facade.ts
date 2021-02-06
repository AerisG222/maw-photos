import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { SettingsStoreActions, SettingsStoreSelectors } from '@core/root-store';
import { BaseSettingsFacade } from './base-settings-facade';
import { SearchPageSettings } from 'src/app/models/settings/search-page-settings';

@Injectable({
    providedIn: 'root'
})
export class SearchPageSettingsFacade implements BaseSettingsFacade<SearchPageSettings> {
    settings$ = this.store.select(SettingsStoreSelectors.searchPageSettings);

    constructor(private store: Store) { }

    save(settings: SearchPageSettings): void {
        this.store.dispatch(SettingsStoreActions.saveSearchPageSettings({ settings }));
    }
}
