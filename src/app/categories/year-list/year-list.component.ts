import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, tap, first, map } from 'rxjs/operators';

import { CategoryMargin } from 'src/app/models/category-margin.model';
import { SettingsStoreSelectors, SettingsStoreActions, RootStoreSelectors, AuthStoreSelectors } from 'src/app/core/root-store';

@Component({
    selector: 'app-categories-year-list',
    templateUrl: './year-list.component.html',
    styleUrls: ['./year-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class YearListComponent implements OnInit {
    margin$: Observable<CategoryMargin> | null = null;
    years$: Observable<number[]> | null = null;
    isAdmin$: Observable<boolean> | null = null;

    constructor(
        private store: Store,
        private activatedRoute: ActivatedRoute
    ) {

    }

    ngOnInit(): void {
        this.isAdmin$ = this.store.select(AuthStoreSelectors.selectIsAdmin);

        this.activatedRoute.fragment
            .pipe(
                first(),
                filter(f => !!f),
                tap(y => {
                    const year = parseInt(y, 10);

                    if (!isNaN(year)) {
                        this.store.dispatch(SettingsStoreActions.updateCategoryListYearFilterRequest({ yearFilter: year }));
                    }
                })
            ).subscribe();

        this.margin$ = this.store.select(SettingsStoreSelectors.selectCategoryListCategoryMargin);
        this.years$ = this.store.select(RootStoreSelectors.selectAllFilteredCategoryYears);
    }
}
