import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PhotoCategoryStoreActions, RootStoreState, PhotoCategoryStoreSelectors } from 'src/app/core/root-store';

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
        this.years$ = this._store$.pipe (
            select(PhotoCategoryStoreSelectors.selectAllYears()),
            map(years => years.sort(this.yearsDescending))
        );

        this._store$.dispatch(new PhotoCategoryStoreActions.LoadRequestAction());
    }

    private yearsDescending(first: number, second: number) {
        return second - first;
    }
}
