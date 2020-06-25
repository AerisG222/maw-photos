import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, tap, first } from 'rxjs/operators';

import { CategoryMargin } from 'src/app/models/category-margin.model';
import { SettingsStoreSelectors, SettingsStoreActions, RootStoreSelectors, AuthStoreSelectors } from 'src/app/core/root-store';

@Component({
    selector: 'app-categories-year-list',
    templateUrl: './year-list.component.html',
    styleUrls: ['./year-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class YearListComponent implements OnInit {
    margin$: Observable<CategoryMargin>;
    years$: Observable<number[]>;
    isAdmin$: Observable<boolean>;

    constructor(
        private store$: Store,
        private activatedRoute: ActivatedRoute
    ) {

    }

    ngOnInit(): void {
        this.isAdmin$ = this.store$.pipe(
            select(AuthStoreSelectors.selectIsAdmin)
        );

        this.activatedRoute.fragment
            .pipe(
                first(),
                filter(f => !!f),
                tap(y => {
                    const year = parseInt(y, 10);

                    if (!isNaN(year)) {
                        this.store$.dispatch(SettingsStoreActions.updateCategoryListYearFilterRequest({ yearFilter: year }));
                    }
                })
            ).subscribe();

        this.margin$ = this.store$
            .pipe(
                select(SettingsStoreSelectors.selectCategoryListCategoryMargin)
            );

        this.years$ = this.store$
            .pipe(
                select(RootStoreSelectors.selectAllFilteredCategoryYears)
            );
    }
}
