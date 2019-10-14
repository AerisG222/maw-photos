import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';

import { CategoryFilter } from 'src/app/core/models/category-filter.model';
import { RootStoreState, SettingsStoreActions } from 'src/app/core/root-store';
import { MatSelectChange } from '@angular/material/select';

@Component({
    selector: 'app-category-type-filter',
    templateUrl: './category-type-filter.component.html',
    styleUrls: ['./category-type-filter.component.scss']
})
export class CategoryTypeFilterComponent implements OnInit {
    categoryTypes = CategoryFilter.allCategoryFilters;
    categoryTypeControl = new FormControl('all');

    constructor(
        private store$: Store<RootStoreState.State>
    ) {

    }

    ngOnInit(): void {

    }

    onSelectCategoryType(change: MatSelectChange): void {
        // tslint:disable-next-line: max-line-length
        this.store$.dispatch(SettingsStoreActions.updateCategoryListCategoryFilterRequest({ newFilter: CategoryFilter.forValue(change.value) }));
    }
}
