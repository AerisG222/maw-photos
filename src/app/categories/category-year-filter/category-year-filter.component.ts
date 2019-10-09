import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { first, tap } from 'rxjs/operators';

import { RootStoreState, RootStoreSelectors, SettingsStoreActions } from 'src/app/core/root-store';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-category-year-filter',
    templateUrl: './category-year-filter.component.html',
    styleUrls: ['./category-year-filter.component.scss']
})
export class CategoryYearFilterComponent implements OnInit {
    yearControl = new FormControl('');
    destroySub = new Subscription();

    allYears$: Observable<number[]>;
    selectedYear$: Observable<number|string>;

    constructor(
        private store$: Store<RootStoreState.State>
    ) {

    }

    ngOnInit() {
        this.store$
            .pipe(
                select(RootStoreSelectors.selectInitialYearFilterSelection),
                tap(val => this.yearControl.setValue(val)),
                first()
            )
            .subscribe();

        this.allYears$ = this.store$
            .pipe(
                select(RootStoreSelectors.selectAllYears)
            );
    }

    onSelectYear(change: MatSelectChange): void {
        this.store$.dispatch(new SettingsStoreActions.UpdateCategoryListYearFilterRequestAction({ yearFilter: change.value }));
    }
}
