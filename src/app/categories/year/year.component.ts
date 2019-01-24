import { Component, OnInit, Input, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { photoApiServiceToken, PhotoApiService } from '../../core/services/photo-api.service';
import { Category } from '../../core/models/category.model';
import { Settings } from '../../core/models/settings.model';
import { RootStoreState, SettingsStoreSelectors } from '../../root-store';

@Component({
    selector: 'app-year',
    templateUrl: './year.component.html',
    styleUrls: ['./year.component.scss']
})
export class YearComponent implements OnInit {
    @Input() year: number;
    categories$: Observable<Category[]>;
    settings$: Observable<Settings>;

    constructor(
        @Inject(photoApiServiceToken) private _api: PhotoApiService,
        private _store$: Store<RootStoreState.State>
    ) {

    }

    ngOnInit() {
        this.categories$ = this._api.getCategoriesForYear(this.year);
        this.settings$ = this._store$.select(SettingsStoreSelectors.selectSettings);
    }
}
