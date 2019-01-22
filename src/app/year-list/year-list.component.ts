import { Component, OnInit, Input, Inject } from '@angular/core';

import { PHOTO_API_SERVICE, IPhotoApiService } from '../services/iphoto-api.service';
import { Category } from '../models/category.model';
import { Observable } from 'rxjs';
import { Settings } from '../models/settings.model';
import { Store } from '@ngrx/store';
import { RootStoreState, SettingsStoreSelectors } from '../root-store';

@Component({
    selector: 'app-year-list',
    templateUrl: './year-list.component.html',
    styleUrls: ['./year-list.component.scss']
})
export class YearListComponent implements OnInit {
    @Input() year: number;
    categories$: Observable<Category[]>;
    settings$: Observable<Settings>;

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
