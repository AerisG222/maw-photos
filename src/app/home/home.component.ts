import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { PhotoCategoryStoreActions, PhotoCategoryStoreSelectors, RootStoreState } from '../root-store';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    years$: Observable<number[]>;

    constructor(
        private _store$: Store<RootStoreState.State>
    ) {

    }

    ngOnInit() {
        this.years$ = this._store$.pipe (
            select(PhotoCategoryStoreSelectors.selectAllYears)
        );

        this._store$.dispatch(new PhotoCategoryStoreActions.LoadRequestAction());
    }
}
