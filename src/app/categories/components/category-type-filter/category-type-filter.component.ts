import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { allCategoryTypeFilters, CategoryTypeFilter, toCategoryTypeFilter } from '@models';
import { SettingsStoreSelectors } from '@core/root-store';
import { MatSelectChange } from '@angular/material/select';
import { CategoriesStoreActions } from '../../store';

@Component({
    selector: 'app-categories-category-type-filter',
    templateUrl: './category-type-filter.component.html',
    styleUrls: ['./category-type-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryTypeFilterComponent {
    effectiveFilter$ = this.store.select(SettingsStoreSelectors.categoryListCategoryFilter);
    categoryTypes = allCategoryTypeFilters;

    constructor(
        private store: Store
    ) {

    }

    onSelectCategoryType(change: MatSelectChange): void {
        const filter = toCategoryTypeFilter(change.value) as CategoryTypeFilter;

        this.store.dispatch(CategoriesStoreActions.categoriesTypeFilterChanged({ filter }));
    }
}
