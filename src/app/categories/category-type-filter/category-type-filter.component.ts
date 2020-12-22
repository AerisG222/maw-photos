import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store, select } from '@ngrx/store';

import { CategoryFilter } from 'src/app/models/category-filter.model';
import { SettingsStoreActions, SettingsStoreSelectors } from 'src/app/core/root-store';
import { MatSelectChange } from '@angular/material/select';
import { tap, first } from 'rxjs/operators';

@Component({
    selector: 'app-categories-category-type-filter',
    templateUrl: './category-type-filter.component.html',
    styleUrls: ['./category-type-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryTypeFilterComponent implements OnInit {
    categoryTypes = CategoryFilter.allCategoryFilters;
    categoryTypeControl = new FormControl('all');

    constructor(
        private store$: Store
    ) {

    }

    ngOnInit(): void {
        this.store$
            .pipe(
                select(SettingsStoreSelectors.selectCategoryListCategoryFilter),
                tap(filter => this.categoryTypeControl.setValue(filter.value)),
                first()
            )
            .subscribe();
    }

    onSelectCategoryType(change: MatSelectChange): void {
        // eslint-disable-next-line max-len
        this.store$.dispatch(SettingsStoreActions.updateCategoryListCategoryFilterRequest({ newFilter: CategoryFilter.forValue(change.value) }));
    }
}
