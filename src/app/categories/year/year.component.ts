import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ThumbnailSize } from 'src/app/models/thumbnail-size.model';
import { CategoryTeaser } from 'src/app/models/category-teaser.model';
import {
    RootStoreSelectors,
    SettingsStoreSelectors
} from 'src/app/core/root-store';

@Component({
    selector: 'app-categories-year',
    templateUrl: './year.component.html',
    styleUrls: ['./year.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class YearComponent implements OnInit {
    @Input() year: number | null = null;

    categories$: Observable<CategoryTeaser[]> | null = null;
    showListView$: Observable<boolean> | null = null;
    showGridView$: Observable<boolean> | null = null;
    listThumbnailSize$: Observable<ThumbnailSize> | null = null;
    gridThumbnailSize$: Observable<ThumbnailSize> | null = null;
    gridShowTitles$: Observable<boolean> | null = null;

    constructor(
        private store: Store
    ) {

    }

    ngOnInit(): void {
        this.listThumbnailSize$ = this.store.select(SettingsStoreSelectors.selectCategoryListListViewThumbnailSize);
        this.gridThumbnailSize$ = this.store.select(SettingsStoreSelectors.selectCategoryListThumbnailSize);
        this.gridShowTitles$ = this.store.select(SettingsStoreSelectors.selectCategoryListShowCategoryTitles);
        this.showListView$ = this.store.select(SettingsStoreSelectors.selectCategoryListShouldShowListView);
        this.showGridView$ = this.store.select(SettingsStoreSelectors.selectCategoryListShouldShowGridView);
        this.categories$ = this.store.select(RootStoreSelectors.selectAllFilteredCategoriesForYear, { year: this.year as number});
    }
}
