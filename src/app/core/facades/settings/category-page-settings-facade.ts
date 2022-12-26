import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { SettingsStoreActions, SettingsStoreSelectors } from '@core/root-store';
import { CategoryPageSettings } from '@models';
import { BaseSettingsFacade } from './base-settings-facade';
import { CategoryViewMode } from '@models';

@Injectable({
    providedIn: 'root',
})
export class CategoryPageSettingsFacade extends BaseSettingsFacade<CategoryPageSettings> {
    settings$ = this.store.select(SettingsStoreSelectors.selectCategoryPageSettings);

    constructor(private store: Store) {
        super();
    }

    save(settings: CategoryPageSettings): void {
        this.store.dispatch(
            SettingsStoreActions.saveCategoryPageSettings({ settings })
        );
    }

    selectGridView(): void {
        this.saveUpdatedField((s) => (s.viewMode = CategoryViewMode.grid));
    }

    selectListView(): void {
        this.saveUpdatedField((s) => (s.viewMode = CategoryViewMode.list));
    }
}
