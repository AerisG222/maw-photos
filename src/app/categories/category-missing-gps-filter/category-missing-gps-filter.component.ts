import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { SettingsStoreSelectors, SettingsStoreActions } from '@core/root-store';

@Component({
    selector: 'app-categories-category-missing-gps-filter',
    templateUrl: './category-missing-gps-filter.component.html',
    styleUrls: ['./category-missing-gps-filter.component.scss']
})
export class CategoryMissingGpsFilterComponent {
    filterEnabled$ = this.store.select(SettingsStoreSelectors.categoryListMissingGpsFilter);

    constructor(
        private store: Store
    ) {

    }

    onToggleMissingGpsData(): void {
        this.store.dispatch(SettingsStoreActions.toggleCategoryListMissingGpsFilterRequest());
    }
}
