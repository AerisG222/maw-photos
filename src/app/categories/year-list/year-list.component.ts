import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { PhotoCategoryStoreActions, RootStoreState, PhotoCategoryStoreSelectors, VideoCategoryStoreActions, VideoCategoryStoreSelectors, RootStoreSelectors } from 'src/app/core/root-store';

@Component({
    selector: 'app-year-list',
    templateUrl: './year-list.component.html',
    styleUrls: ['./year-list.component.scss']
})
export class YearListComponent implements OnInit {
    years$: Observable<number[]>;

    constructor(
        private _store$: Store<RootStoreState.State>
    ) {

    }

    ngOnInit() {
        this.years$ = this._store$.pipe(select(RootStoreSelectors.selectCombinedYears));

        this._store$.dispatch(new PhotoCategoryStoreActions.LoadRequestAction());
        this._store$.dispatch(new VideoCategoryStoreActions.LoadRequestAction());
    }
}
