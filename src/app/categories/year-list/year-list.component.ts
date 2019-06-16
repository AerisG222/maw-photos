import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { switchMap, tap, map, filter } from 'rxjs/operators';
import { Observable, BehaviorSubject, combineLatest, Subscription } from 'rxjs';

import { CategoryFilter } from 'src/app/core/models/category-filter.model';
import { CategoryMargin } from 'src/app/core/models/category-margin.model';
import {
    RootStoreState,
    RootStoreSelectors,
    SettingsStoreSelectors,
    SettingsStoreActions,
    PhotoCategoryStoreSelectors,
    VideoCategoryStoreSelectors
} from 'src/app/core/root-store';
import { MatSelectChange } from '@angular/material/select';

@Component({
    selector: 'app-year-list',
    templateUrl: './year-list.component.html',
    styleUrls: ['./year-list.component.scss']
})
export class YearListComponent implements OnInit, OnDestroy {
    private destroySub = new Subscription();

    form: FormGroup;
    activeYear$ = new BehaviorSubject<number>(0);
    yearFilterEnabled$: Observable<boolean>;
    allYears$: Observable<number[]>;
    years$: Observable<number[]>;
    margin$: Observable<CategoryMargin>;
    showCamera$: Observable<boolean>;
    showVideoCamera$: Observable<boolean>;

    constructor(
        private formBuilder: FormBuilder,
        private store$: Store<RootStoreState.State>,
        private activatedRoute: ActivatedRoute
    ) {

    }

    ngOnInit() {
        this.store$.dispatch(new SettingsStoreActions.LoadRequestAction());

        this.form = this.formBuilder.group({
            yearSelect: [''],
        });

        this.destroySub.add(this.activatedRoute.fragment
            .pipe(
                filter(f => !!f),
                tap(y => {
                    const year = parseInt(y, 10);

                    if (!isNaN(year)) {
                        this.onSelectYear(new MatSelectChange(null, year));
                        this.updateYearSelection(year);
                    }
                })
            ).subscribe()
        );

        this.showCamera$ = this.store$
            .pipe(
                select(SettingsStoreSelectors.selectCategoryListCategoryFilter),
                map(f => f.name === CategoryFilter.photos.name || f.name === CategoryFilter.all.name)
            );

        this.showVideoCamera$ = this.store$
            .pipe(
                select(SettingsStoreSelectors.selectCategoryListCategoryFilter),
                map(f => f.name === CategoryFilter.videos.name || f.name === CategoryFilter.all.name)
            );

        this.yearFilterEnabled$ = this.store$
            .pipe(
                select(SettingsStoreSelectors.selectCategoryListYearFilterEnabled)
            );

        const filters$ = combineLatest([
            this.store$
                .pipe(
                    select(SettingsStoreSelectors.selectCategoryListCategoryFilter)
                ),
            this.store$
                .pipe(
                    select(SettingsStoreSelectors.selectCategoryListYearFilterEnabled)
                )
        ]).pipe(
            map(x => ({ categoryFilter: x[0], yearFilterEnabled: x[1] }))
        );

        this.allYears$ = filters$
            .pipe(
                switchMap(f => {
                    switch (f.categoryFilter) {
                        case CategoryFilter.photos:
                            return this.store$.pipe( select(PhotoCategoryStoreSelectors.selectAllYears) );
                        case CategoryFilter.videos:
                            return this.store$.pipe( select(VideoCategoryStoreSelectors.selectAllYears) );
                        default:
                            return this.store$.pipe( select(RootStoreSelectors.selectCombinedYears) );
                    }
                }),
                map(years => years.sort((a, b) => b - a)),
                tap(years => {
                    if (!years.includes(this.activeYear$.value)) {
                        this.onSelectYear(new MatSelectChange(null, years[0]));
                        this.updateYearSelection(years[0]);
                    }
                })
            );

        this.years$ = combineLatest([
            filters$,
            this.allYears$,
            this.activeYear$
        ]).pipe(
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

        this.margin$ = this.store$
            .pipe(
                select(SettingsStoreSelectors.selectCategoryListCategoryMargin)
            );
    }

    ngOnDestroy(): void {
        this.destroySub.unsubscribe();
    }

    onSelectYear(change: MatSelectChange): void {
        this.activeYear$.next(change.value);
    }

    updateYearSelection(year: number): void {
        this.form.get('yearSelect').setValue(year);
    }
}
