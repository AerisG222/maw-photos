import { Injectable } from '@angular/core';
import { SettingsStoreActions, SettingsStoreSelectors } from '@core/root-store';
import { CategoryTypeFilter } from '@models';
import { Store } from '@ngrx/store';

import { CategoryFilterSettings } from '@models';
import { BaseSettingsFacade } from './base-settings-facade';

@Injectable({
    providedIn: 'root',
})
export class CategoryFilterSettingsFacade extends BaseSettingsFacade<CategoryFilterSettings> {
    settings$ = this.store.select(
        SettingsStoreSelectors.selectCategoryFilterSettings
    );

    constructor(private store: Store) {
        super();
    }

    save(settings: CategoryFilterSettings): void {
        this.store.dispatch(
            SettingsStoreActions.saveCategoryFilterSettings({ settings })
        );
    }

    saveYearFilter(yearFilter: number | string): void {
        this.saveUpdatedField((s) => (s.yearFilter = yearFilter));
    }

    saveTypeFilter(typeFilter: CategoryTypeFilter): void {
        this.saveUpdatedField((s) => (s.typeFilter = typeFilter));
    }

    saveMissingGpsFilter(gpsFilter: boolean): void {
        this.saveUpdatedField((s) => (s.missingGpsFilter = gpsFilter));
    }
}
