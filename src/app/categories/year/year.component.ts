import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PhotoCategory } from 'src/app/core/models/photo-category.model';
import { Settings } from 'src/app/core/models/settings.model';
import { RootStoreState, SettingsStoreSelectors, PhotoCategoryStoreSelectors } from 'src/app/core/root-store';

@Component({
    selector: 'app-year',
    templateUrl: './year.component.html',
    styleUrls: ['./year.component.scss']
})
export class YearComponent implements OnInit {
    @Input() year: number;
    categories$: Observable<PhotoCategory[]>;
    settings$: Observable<Settings>;

    constructor(
        private _store$: Store<RootStoreState.State>
    ) {

    }

    ngOnInit() {
        this.settings$ = this._store$
            .pipe(
                select(SettingsStoreSelectors.selectSettings)
            );

        this.categories$ = this._store$
            .pipe(
                select(PhotoCategoryStoreSelectors.selectCategoriesForYear(this.year)),
                map(categories => categories.sort(this.categoriesDescending))
            );
    }

    private categoriesDescending(first: PhotoCategory, second: PhotoCategory) {
        return second.id - first.id;
    }
}
