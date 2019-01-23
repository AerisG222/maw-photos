import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { PhotoCategoryStoreActions, RootStoreState } from '../root-store';
import { photoApiServiceToken, PhotoApiService } from '../core/services/photo-api.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    years$: Observable<number[]>;

    constructor(
        @Inject(photoApiServiceToken) private _api: PhotoApiService,
        private _store$: Store<RootStoreState.State>
    ) {

    }

    ngOnInit() {
        this.years$ = this._api.getYears();

        // this.years$ = this._store$.pipe (
        //     select(PhotoCategoryStoreSelectors.selectAllYears)
        // );

        // this._store$.dispatch(new PhotoCategoryStoreActions.LoadRequestAction());
    }
}
