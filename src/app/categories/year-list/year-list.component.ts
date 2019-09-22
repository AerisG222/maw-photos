import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

import { CategoryMargin } from 'src/app/core/models/category-margin.model';
import {
    RootStoreState,
    SettingsStoreSelectors,
    SettingsStoreActions,
    RootStoreSelectors
} from 'src/app/core/root-store';

@Component({
    selector: 'app-year-list',
    templateUrl: './year-list.component.html',
    styleUrls: ['./year-list.component.scss']
})
export class YearListComponent implements OnInit, OnDestroy {
    private destroySub = new Subscription();

    margin$: Observable<CategoryMargin>;
    years$: Observable<number[]>;

    constructor(
        private store$: Store<RootStoreState.State>,
        private activatedRoute: ActivatedRoute
    ) {

    }

    ngOnInit() {
        this.store$.dispatch(new SettingsStoreActions.LoadRequestAction());

        this.destroySub.add(this.activatedRoute.fragment
            .pipe(
                filter(f => !!f),
                tap(y => {
                    const year = parseInt(y, 10);

                    if (!isNaN(year)) {
                        this.store$.dispatch(new SettingsStoreActions.UpdateCategoryListYearFilterRequestAction({ yearFilter: year }));
                    }
                })
            ).subscribe()
        );

        this.margin$ = this.store$
            .pipe(
                select(SettingsStoreSelectors.selectCategoryListCategoryMargin)
            );

        this.years$ = this.store$
            .pipe(
                select(RootStoreSelectors.selectAllFilteredCategoryYears)
            );
    }

    ngOnDestroy(): void {
        this.destroySub.unsubscribe();
    }
}
