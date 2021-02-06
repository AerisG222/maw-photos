import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { SettingsStoreActions, SettingsStoreSelectors } from '@core/root-store';
import { CategoryPageSettings } from 'src/app/models/settings/category-page-settings';
import { BaseSettingsFacade } from './base-settings-facade';

@Injectable({
    providedIn: 'root'
})
export class CategoryPageSettingsFacade implements BaseSettingsFacade<CategoryPageSettings> {
    settings$ = this.store.select(SettingsStoreSelectors.categoryPageSettings);

    constructor(private store: Store) { }

    save(settings: CategoryPageSettings): void {
        this.store.dispatch(SettingsStoreActions.saveCategoryPageSettings({ settings }));
    }
}
