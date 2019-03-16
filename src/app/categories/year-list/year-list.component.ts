import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { RootStoreState, RootStoreSelectors } from 'src/app/core/root-store';

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
    }
}
