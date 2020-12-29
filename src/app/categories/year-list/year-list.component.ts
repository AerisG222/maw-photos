import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, tap, first } from 'rxjs/operators';

import { SettingsStoreSelectors, SettingsStoreActions, RootStoreSelectors, AuthStoreSelectors } from 'src/app/core/root-store';

@Component({
    selector: 'app-categories-year-list',
    templateUrl: './year-list.component.html',
    styleUrls: ['./year-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class YearListComponent implements OnInit {
    margin$ = this.store.select(SettingsStoreSelectors.categoryListCategoryMargin);
    years$ = this.store.select(RootStoreSelectors.allFilteredCategoryYears);
    isAdmin$ = this.store.select(AuthStoreSelectors.isAdmin);

    constructor(
        private store: Store,
        private activatedRoute: ActivatedRoute
    ) {

    }

    ngOnInit(): void {
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
    }
}
