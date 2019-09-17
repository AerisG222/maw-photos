import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { first, tap } from 'rxjs/operators';

import { RootStoreState, RootStoreSelectors, SettingsStoreActions } from 'src/app/core/root-store';

@Component({
    selector: 'app-category-year-filter',
    templateUrl: './category-year-filter.component.html',
    styleUrls: ['./category-year-filter.component.scss']
})
export class CategoryYearFilterComponent implements OnInit {
    yearControl = new FormControl('');
    allYears$: Observable<number[]>;

    constructor(
        private store$: Store<RootStoreState.State>
    ) {

    }

    ngOnInit() {
        this.store$
            .pipe(
                select(RootStoreSelectors.selectAllYears),
                tap(years => {
                    if (!!years) {
                        this.yearControl.setValue(years[0]);
                    }
                }),
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
