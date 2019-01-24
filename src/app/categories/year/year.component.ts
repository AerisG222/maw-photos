import { Component, OnInit, Input, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
        this.settings$ = this._store$.select(SettingsStoreSelectors.selectSettings);

        this.categories$ = this._api.getCategoriesForYear(this.year)
            .pipe(
                map(categories => categories.sort(this.categoriesDescending))
            );
    }

    private categoriesDescending(first: Category, second: Category) {
        return second.id - first.id;
    }
}
