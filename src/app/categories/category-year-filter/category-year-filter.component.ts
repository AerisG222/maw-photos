import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { first, tap } from 'rxjs/operators';

import { RootStoreSelectors, SettingsStoreActions } from 'src/app/core/root-store';

@Component({
    selector: 'app-categories-category-year-filter',
    templateUrl: './category-year-filter.component.html',
    styleUrls: ['./category-year-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryYearFilterComponent implements OnInit {
    yearControl = new FormControl('');

    allYears$: Observable<number[]> | null = null;
    selectedYear$: Observable<number|string> | null = null;

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

        this.allYears$ = this.store.select(RootStoreSelectors.allYears);
    }

    onSelectYear(change: MatSelectChange): void {
        this.store.dispatch(SettingsStoreActions.updateCategoryListYearFilterRequest({ yearFilter: change.value }));
    }
}
