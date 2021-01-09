import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import {
    RootStoreSelectors,
    SettingsStoreSelectors
} from 'src/app/core/root-store';
import { CategoryTeaser } from '@models/category-teaser.model';

@Component({
    selector: 'app-categories-year',
    templateUrl: './year.component.html',
    styleUrls: ['./year.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class YearComponent implements OnInit {
    @Input() year: number | null = null;

    categories$: Observable<CategoryTeaser[]> | null = null;
    showListView$ = this.store.select(SettingsStoreSelectors.categoryListShouldShowListView);
    showGridView$ = this.store.select(SettingsStoreSelectors.categoryListShouldShowGridView);
    listThumbnailSize$ = this.store.select(SettingsStoreSelectors.categoryListListViewThumbnailSize);
    gridThumbnailSize$ = this.store.select(SettingsStoreSelectors.categoryListThumbnailSize);
    gridShowTitles$ = this.store.select(SettingsStoreSelectors.categoryListShowCategoryTitles);

    constructor(
        private store: Store
    ) {

    }

    ngOnInit() {
        this.categories$ = this.store.select(RootStoreSelectors.allFilteredCategoriesForYear, { year: this.year as number});
    }
}
