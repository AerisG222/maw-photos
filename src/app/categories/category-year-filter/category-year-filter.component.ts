import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { first, tap } from 'rxjs/operators';

import { RootStoreSelectors, SettingsStoreActions } from '@core/root-store';

@Component({
    selector: 'app-categories-category-year-filter',
    templateUrl: './category-year-filter.component.html',
    styleUrls: ['./category-year-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryYearFilterComponent implements OnInit {
    yearControl = new FormControl('');

    selectedYear$: Observable<number|string> | null = null;
    allYears$ = this.store.select(RootStoreSelectors.allYears);

    constructor(
        private store: Store
    ) {

    }

    ngOnInit(): void {
        this.store
            .select(RootStoreSelectors.initialYearFilterSelection)
            .pipe(
                tap(val => this.yearControl.setValue(val)),
                first()
            )
            .subscribe();
    }

    onSelectYear(change: MatSelectChange): void {
        this.store.dispatch(SettingsStoreActions.updateCategoryListYearFilterRequest({ yearFilter: change.value }));
    }
}
