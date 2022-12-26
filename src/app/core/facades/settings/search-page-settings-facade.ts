import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { SettingsStoreActions, SettingsStoreSelectors } from '@core/root-store';
import { BaseSettingsFacade } from './base-settings-facade';
import { SearchPageSettings } from '@models';

@Injectable({
    providedIn: 'root',
})
export class SearchPageSettingsFacade extends BaseSettingsFacade<SearchPageSettings> {
    settings$ = this.store.select(SettingsStoreSelectors.selectSearchPageSettings);

    constructor(private store: Store) {
        super();
    }

    save(settings: SearchPageSettings): void {
        this.store.dispatch(
            SettingsStoreActions.saveSearchPageSettings({ settings })
        );
    }
}
