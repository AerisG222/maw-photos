import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { Settings } from 'src/app/core/models/settings.model';
import { Category } from 'src/app/core/models/category.model';
import { CategoryFilter } from 'src/app/core/models/category-filter.model';
import {
    PhotoCategoryStoreSelectors,
    RootStoreState,
    RootStoreSelectors,
    SettingsStoreSelectors,
    VideoCategoryStoreSelectors
} from 'src/app/core/root-store';
import { photoCategoryToCategory, videoCategoryToCategory } from 'src/app/core/models/category-map-functions';

@Component({
    selector: 'app-year',
    templateUrl: './year.component.html',
    styleUrls: ['./year.component.scss']
})
export class YearComponent implements OnInit {
    @Input() showYear = true;
    @Input() year: number;
    categories$: Observable<Category[]>;
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
                select(SettingsStoreSelectors.selectCategoryListCategoryFilter),
                switchMap(f => {
                    switch (f) {
                        case CategoryFilter.photos:
                            return this._store$.pipe(
                                select(PhotoCategoryStoreSelectors.selectCategoriesForYear, { year: this.year }),
                                map(photoCategories => photoCategories.map(c => photoCategoryToCategory(c)))
                            );
                        case CategoryFilter.videos:
                            return this._store$.pipe(
                                select(VideoCategoryStoreSelectors.selectCategoriesForYear, { year: this.year }),
                                map(videoCategories => videoCategories.map(c => videoCategoryToCategory(c)))
                            );
                        default:
                            return this._store$.pipe(
                                select(RootStoreSelectors.selectCombinedCategoriesForYear, { year: this.year })
                            );
                    }
                })
            );
    }
}
