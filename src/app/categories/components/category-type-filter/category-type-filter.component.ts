import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';

import { CategoryTypeFilter } from '@models';
import { SettingsStoreActions, SettingsStoreSelectors } from '@core/root-store';
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
    categoryTypes = CategoryTypeFilter.allCategoryFilters;
    categoryTypeControl = new FormControl('all');

    constructor(
        private store: Store
    ) {

    }

    ngOnInit(): void {
        this.store
            .select(SettingsStoreSelectors.categoryListCategoryFilter)
            .pipe(
                tap(filter => this.categoryTypeControl.setValue(filter.value)),
                first()
            )
            .subscribe();
    }

    onSelectCategoryType(change: MatSelectChange): void {
        const filter = CategoryTypeFilter.forValue(change.value);

        this.store.dispatch(CategoriesStoreActions.categoriesTypeFilterChanged({ filter }));
    }
}
