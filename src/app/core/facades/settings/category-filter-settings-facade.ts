import { Injectable } from '@angular/core';
import { SettingsStoreActions, SettingsStoreSelectors } from '@core/root-store';
import { Store } from '@ngrx/store';

import { CategoryFilterSettings } from 'src/app/models/settings/category-filter-settings';
import { BaseSettingsFacade } from './base-settings-facade';

@Injectable({
    providedIn: 'root'
})
export class CategoryFilterSettingsFacade implements BaseSettingsFacade<CategoryFilterSettings> {
    settings$ = this.store.select(SettingsStoreSelectors.categoryFilterSettings);

    constructor(private store: Store) { }

    save(settings: CategoryFilterSettings): void {
        this.store.dispatch(SettingsStoreActions.saveCategoryFilterSettings({ settings }));
    }
}
