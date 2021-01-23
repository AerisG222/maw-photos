import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Store } from '@ngrx/store';

import { RootStoreSelectors } from '@core/root-store';
import { CategoriesStoreActions, CategoriesStoreSelectors } from '../../store';

@Component({
    selector: 'app-categories-category-year-filter',
    templateUrl: './category-year-filter.component.html',
    styleUrls: ['./category-year-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryYearFilterComponent {
    effectiveFilter$ = this.store.select(CategoriesStoreSelectors.categoryEffectiveYearFilter);
    allYears$ = this.store.select(RootStoreSelectors.allYears);

    constructor(
        private store: Store
    ) {

    }

    onSelectYear(change: MatSelectChange): void {
        this.store.dispatch(CategoriesStoreActions.categoriesYearFilterChanged({ filter: change.value }));
    }
}
