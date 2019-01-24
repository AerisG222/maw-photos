import { Component, OnInit, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PhotoCategoryStoreActions, RootStoreState } from '../../root-store';
import { photoApiServiceToken, PhotoApiService } from '../../core/services/photo-api.service';

@Component({
    selector: 'app-year-list',
    templateUrl: './year-list.component.html',
    styleUrls: ['./year-list.component.scss']
})
export class YearListComponent implements OnInit {
    years$: Observable<number[]>;

    constructor(
        @Inject(photoApiServiceToken) private _api: PhotoApiService,
        private _store$: Store<RootStoreState.State>
    ) {

    }

    ngOnInit() {
        this.years$ = this._api.getYears()
            .pipe(
                map(years => years.sort(this.yearsDescending))
            );

        // this.years$ = this._store$.pipe (
        //     select(PhotoCategoryStoreSelectors.selectAllYears)
        // );

        // this._store$.dispatch(new PhotoCategoryStoreActions.LoadRequestAction());
    }

    private yearsDescending(first: number, second: number) {
        return second - first;
    }
}
