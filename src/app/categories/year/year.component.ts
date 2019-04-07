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
import { CategoryListType } from 'src/app/core/models/category-list-type.model';
import { ThumbnailSize } from 'src/app/core/models/thumbnail-size.model';

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
    showListView$: Observable<boolean>;
    showGridView$: Observable<boolean>;
    listThumbnailSize$: Observable<ThumbnailSize>;

    constructor(
        private _store$: Store<RootStoreState.State>
    ) {

    }

    ngOnInit() {
        this.listThumbnailSize$ = this._store$
            .pipe(
                select(SettingsStoreSelectors.selectCategoryListListViewThumbnailSize)
            );

        this.showListView$ = this._store$
            .pipe(
                select(SettingsStoreSelectors.selectCategoryListListType),
                map(type => type.name === CategoryListType.list.name)
            );

        this.showGridView$ = this._store$
            .pipe(
                select(SettingsStoreSelectors.selectCategoryListListType),
                map(type => type.name === CategoryListType.grid.name)
            );

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
