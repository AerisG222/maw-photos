import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

import { toolbarShow } from 'src/app/shared/animations';
import { CategoryMargin } from 'src/app/core/models/category-margin.model';
import {
    SettingsStoreSelectors,
    SettingsStoreActions,
    RootStoreSelectors
} from 'src/app/core/root-store';

@Component({
    selector: 'app-year-list',
    templateUrl: './year-list.component.html',
    styleUrls: ['./year-list.component.scss'],
    animations: [
        trigger('toolbarFadeIn', [
            transition('* => *', [
                useAnimation(toolbarShow)
            ])
        ])
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class YearListComponent implements OnInit, OnDestroy {
    private destroySub = new Subscription();

    margin$: Observable<CategoryMargin>;
    years$: Observable<number[]>;

    constructor(
        private store$: Store<{}>,
        private activatedRoute: ActivatedRoute
    ) {

    }

    ngOnInit() {
        this.store$.dispatch(SettingsStoreActions.loadRequest());

        this.destroySub.add(this.activatedRoute.fragment
            .pipe(
                filter(f => !!f),
                tap(y => {
                    const year = parseInt(y, 10);

                    if (!isNaN(year)) {
                        this.store$.dispatch(SettingsStoreActions.updateCategoryListYearFilterRequest({ yearFilter: year }));
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
