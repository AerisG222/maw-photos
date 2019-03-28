import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { CategoryMargin } from 'src/app/core/models/category-margin.model';
import {
    RootStoreState,
    RootStoreSelectors,
    SettingsStoreSelectors,
    SettingsStoreActions
} from 'src/app/core/root-store';

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
                select(RootStoreSelectors.selectCombinedYears)
            );

        this.margin$ = this._store$
            .pipe(
                select(SettingsStoreSelectors.selectCategoryListCategoryMargin)
            );
    }
}
