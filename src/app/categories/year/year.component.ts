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
        this.listThumbnailSize$ = this.store.select(SettingsStoreSelectors.categoryListListViewThumbnailSize);
        this.gridThumbnailSize$ = this.store.select(SettingsStoreSelectors.categoryListThumbnailSize);
        this.gridShowTitles$ = this.store.select(SettingsStoreSelectors.categoryListShowCategoryTitles);
        this.showListView$ = this.store.select(SettingsStoreSelectors.categoryListShouldShowListView);
        this.showGridView$ = this.store.select(SettingsStoreSelectors.categoryListShouldShowGridView);
        this.categories$ = this.store.select(RootStoreSelectors.allFilteredCategoriesForYear, { year: this.year as number});
    }
}
