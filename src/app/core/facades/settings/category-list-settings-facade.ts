import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { SettingsStoreActions, SettingsStoreSelectors } from '@core/root-store';
import { CategoryListViewSettings } from 'src/app/models/settings/category-list-view-settings';
import { BaseSettingsFacade } from './base-settings-facade';

@Injectable({
    providedIn: 'root'
})
export class CategoryListSettingsFacade implements BaseSettingsFacade<CategoryListViewSettings> {
    settings$ = this.store.select(SettingsStoreSelectors.categoryListViewSettings);

    constructor(private store: Store) { }

    save(settings: CategoryListViewSettings): void {
        this.store.dispatch(SettingsStoreActions.saveCategoryListViewSettings({ settings }));
    }
}
