import { Component, OnInit, Input, Inject } from '@angular/core';

import { PHOTO_API_SERVICE, IPhotoApiService } from '../services/iphoto-api.service';
import { ICategory } from '../models/icategory.model';
import { Observable } from 'rxjs';
import { ISettings } from '../models/isettings.model';
import { Store } from '@ngrx/store';
import { RootStoreState, SettingsStoreSelectors } from '../root-store';

@Component({
    selector: 'app-year-list',
    templateUrl: './year-list.component.html',
    styleUrls: ['./year-list.component.scss']
})
export class YearListComponent implements OnInit {
    @Input() year: number;
    categories$: Observable<ICategory[]>;
    settings$: Observable<ISettings>;

    constructor(
        @Inject(PHOTO_API_SERVICE) private _api: IPhotoApiService,
        private _store$: Store<RootStoreState.State>
    ) {

    }

    ngOnInit() {
        this.categories$ = this._api.getCategoriesForYear(this.year);
        this.settings$ = this._store$.select(SettingsStoreSelectors.selectSettings);
    }
}
