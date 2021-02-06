import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { SettingsStoreActions, SettingsStoreSelectors } from '@core/root-store';
import { CategoryGridViewSettings } from 'src/app/models/settings/category-grid-view-settings';
import { BaseSettingsFacade } from './base-settings-facade';

@Injectable({
    providedIn: 'root'
})
export class CategoryGridSettingsFacade implements BaseSettingsFacade<CategoryGridViewSettings> {
    settings$ = this.store.select(SettingsStoreSelectors.categoryGridViewSettings);

    constructor(private store: Store) { }

    save(settings: CategoryGridViewSettings): void {
        this.store.dispatch(SettingsStoreActions.saveCategoryGridViewSettings({ settings }));
    }
}
