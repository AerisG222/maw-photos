import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';

import { allCategoryTypeFilters, CategoryTypeFilter, toCategoryTypeFilter } from '@models';
import { SettingsStoreSelectors } from '@core/root-store';
import { MatSelectChange } from '@angular/material/select';
import { tap, first } from 'rxjs/operators';
import { CategoriesStoreActions } from '../../store';

@Component({
    selector: 'app-categories-category-type-filter',
    templateUrl: './category-type-filter.component.html',
    styleUrls: ['./category-type-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryTypeFilterComponent implements OnInit {
    categoryTypes = allCategoryTypeFilters;
    categoryTypeControl = new FormControl('all');

    constructor(
        private store: Store
    ) {

    }

    ngOnInit(): void {
        this.store
            .select(SettingsStoreSelectors.categoryListCategoryFilter)
            .pipe(
                tap(filter => this.categoryTypeControl.setValue(filter)),
                first()
            )
            .subscribe();
    }

    onSelectCategoryType(change: MatSelectChange): void {
        const filter = toCategoryTypeFilter(change.value) as CategoryTypeFilter;

        this.store.dispatch(CategoriesStoreActions.categoriesTypeFilterChanged({ filter }));
    }
}
