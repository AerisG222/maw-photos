import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { CategoryMargin } from 'src/app/core/models/category-margin.model';
import {
    RootStoreState,
    RootStoreSelectors,
    SettingsStoreSelectors,
    SettingsStoreActions,
    PhotoCategoryStoreSelectors,
    VideoCategoryStoreSelectors
} from 'src/app/core/root-store';
import { CategoryFilter } from 'src/app/core/models/category-filter.model';
import { switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-year-list',
    templateUrl: './year-list.component.html',
    styleUrls: ['./year-list.component.scss']
})
export class YearListComponent implements OnInit {
    years$: Observable<number[]>;
    margin$: Observable<CategoryMargin>;

    constructor(
        private _store$: Store<RootStoreState.State>
    ) {

    }

    ngOnInit() {
        this._store$.dispatch(new SettingsStoreActions.LoadRequestAction());

        this.years$ = this._store$
            .pipe(
                select(SettingsStoreSelectors.selectCategoryListCategoryFilter),
                switchMap(f => {
                    switch (f) {
                        case CategoryFilter.photos:
                            return this._store$.pipe( select(PhotoCategoryStoreSelectors.selectAllYears) );
                        case CategoryFilter.videos:
                            return this._store$.pipe( select(VideoCategoryStoreSelectors.selectAllYears) );
                        default:
                            return this._store$.pipe( select(RootStoreSelectors.selectCombinedYears) );
                    }
                })
            );

        this.margin$ = this._store$
            .pipe(
                select(SettingsStoreSelectors.selectCategoryListCategoryMargin)
            );
    }
}
