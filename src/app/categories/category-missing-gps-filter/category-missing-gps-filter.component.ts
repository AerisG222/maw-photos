import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { SettingsStoreSelectors, SettingsStoreActions } from 'src/app/core/root-store';

@Component({
    selector: 'app-categories-category-missing-gps-filter',
    templateUrl: './category-missing-gps-filter.component.html',
    styleUrls: ['./category-missing-gps-filter.component.scss']
})
export class CategoryMissingGpsFilterComponent implements OnInit {
    filterEnabled$: Observable<boolean> | null = null;

    constructor(
        private store: Store
    ) {

    }

    ngOnInit(): void {
        this.filterEnabled$ = this.store.select(SettingsStoreSelectors.categoryListMissingGpsFilter);
    }

    onToggleMissingGpsData(): void {
        this.store.dispatch(SettingsStoreActions.toggleCategoryListMissingGpsFilterRequest());
    }
}
