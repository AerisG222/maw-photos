import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { switchMap, tap, map, filter, take } from 'rxjs/operators';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';

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
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-year-list',
    templateUrl: './year-list.component.html',
    styleUrls: ['./year-list.component.scss']
})
export class YearListComponent implements OnInit {
    activeYear$ = new BehaviorSubject<number>(0);
    yearFilterEnabled$: Observable<boolean>;
    allYears$: Observable<number[]>;
    years$: Observable<number[]>;
    margin$: Observable<CategoryMargin>;

    constructor(
        private _store$: Store<RootStoreState.State>,
        private _activatedRoute: ActivatedRoute
    ) {

    }

    ngOnInit() {
        this._store$.dispatch(new SettingsStoreActions.LoadRequestAction());

        this._activatedRoute.fragment
            .pipe(
                filter(f => !!f),
                tap(y => {
                    const year = parseInt(y, 10);

                    if (!isNaN(year)) {
                        this.activeYear$.next(year);
                    }
                }),
                take(1)
            ).subscribe();

        this.yearFilterEnabled$ = this._store$
            .pipe(
                select(SettingsStoreSelectors.selectCategoryListYearFilterEnabled)
            );

        const filters$ = combineLatest(
            this._store$
                .pipe(
                    select(SettingsStoreSelectors.selectCategoryListCategoryFilter)
                ),
            this._store$
                .pipe(
                    select(SettingsStoreSelectors.selectCategoryListYearFilterEnabled)
                )
        ).pipe(
            map(x => ({ categoryFilter: x[0], yearFilterEnabled: x[1] }))
        );

        this.allYears$ = filters$
            .pipe(
                switchMap(f => {
                    switch (f.categoryFilter) {
                        case CategoryFilter.photos:
                            return this._store$.pipe( select(PhotoCategoryStoreSelectors.selectAllYears) );
                        case CategoryFilter.videos:
                            return this._store$.pipe( select(VideoCategoryStoreSelectors.selectAllYears) );
                        default:
                            return this._store$.pipe( select(RootStoreSelectors.selectCombinedYears) );
                    }
                }),
                map(years => years.sort((a, b) => b - a)),
                tap(years => {
                    if (!years.includes(this.activeYear$.value)) {
                        this.activeYear$.next(years[0]);
                    }
                })
            );

        this.years$ = combineLatest(
            filters$,
            this.allYears$,
            this.activeYear$
        ).pipe(
            map(x => ({ filters: x[0], allYears: x[1], activeYear: x[2] })),
            map(data => {
                if (data.filters.yearFilterEnabled) {
                    return data.allYears
                        .filter(yr => yr === data.activeYear)
                        .sort((a, b) => b - a);
                }

                return data.allYears;
            })
        );

        this.margin$ = this._store$
            .pipe(
                select(SettingsStoreSelectors.selectCategoryListCategoryMargin)
            );
    }

    onSelectYear(year: number): void {
        this.activeYear$.next(year);
    }
}
