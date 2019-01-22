import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { PhotoCategoryStoreActions, RootStoreState } from '../root-store';
import { PHOTO_API_SERVICE, IPhotoApiService } from '../services/iphoto-api.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    years$: Observable<number[]>;

    constructor(
        @Inject(PHOTO_API_SERVICE) private _api: IPhotoApiService,
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
