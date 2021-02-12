import { Injectable } from '@angular/core';
import { SettingsStoreActions, SettingsStoreSelectors } from '@core/root-store';
import { CategoryTypeFilter } from '@models';
import { Store } from '@ngrx/store';

import { CategoryFilterSettings } from '@models';
import { BaseSettingsFacade } from './base-settings-facade';

@Injectable({
    providedIn: 'root'
})
export class CategoryFilterSettingsFacade extends BaseSettingsFacade<CategoryFilterSettings> {
    settings$ = this.store.select(SettingsStoreSelectors.categoryFilterSettings);

    constructor(private store: Store) {
        super();
    }

    save(settings: CategoryFilterSettings): void {
        this.store.dispatch(SettingsStoreActions.saveCategoryFilterSettings({ settings }));
    }

    saveYearFilter(yearFilter: number | string) {
        this.saveUpdatedField(s => s.yearFilter = yearFilter);
    }

    saveTypeFilter(typeFilter: CategoryTypeFilter) {
        this.saveUpdatedField(s => s.typeFilter = typeFilter);
    }

    saveMissingGpsFilter(gpsFilter: boolean) {
        this.saveUpdatedField(s => s.missingGpsFilter = gpsFilter);
    }
}
