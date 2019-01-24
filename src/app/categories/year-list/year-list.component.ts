import { Component, OnInit, Input, Inject } from '@angular/core';

import { photoApiServiceToken, PhotoApiService } from '../../core/services/photo-api.service';
import { Category } from '../../core/models/category.model';
import { Observable } from 'rxjs';
import { Settings } from '../../core/models/settings.model';
import { Store } from '@ngrx/store';
import { RootStoreState, SettingsStoreSelectors } from '../../root-store';

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
        @Inject(photoApiServiceToken) private _api: PhotoApiService,
        private _store$: Store<RootStoreState.State>
    ) {

    }

    ngOnInit() {
        this.categories$ = this._api.getCategoriesForYear(this.year);
        this.settings$ = this._store$.select(SettingsStoreSelectors.selectSettings);
    }
}
