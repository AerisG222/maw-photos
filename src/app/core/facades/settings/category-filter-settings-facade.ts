import { Injectable } from '@angular/core';
import { SettingsStoreActions, SettingsStoreSelectors } from '@core/root-store';
import { CategoryTypeFilter } from '@models';
import { Store } from '@ngrx/store';
import { first } from 'rxjs/operators';

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

    saveYearFilter(yearFilter: number | string) {
        this.saveUpdatedField(s => s.yearFilter = yearFilter);
    }

    saveTypeFilter(typeFilter: CategoryTypeFilter) {
        this.saveUpdatedField(s => s.typeFilter = typeFilter);
    }

    saveMissingGpsFilter(gpsFilter: boolean) {
        this.saveUpdatedField(s => s.missingGpsFilter = gpsFilter);
    }

    private saveUpdatedField(action: (s: CategoryFilterSettings) => void) {
        this.settings$.pipe(
            first(),
        ).subscribe({
            next: filterSettings => {
                action({ ...filterSettings });
                this.save(filterSettings);
            }
        });
    }
}
