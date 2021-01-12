import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import {
    RouterStoreSelectors,
    SettingsStoreSelectors
} from '@core/root-store';
import { CategoryTeaser } from '@models';
import { CategoriesStoreSelectors } from '../../store';

@Component({
    selector: 'app-categories-year',
    templateUrl: './year.component.html',
    styleUrls: ['./year.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class YearComponent implements OnInit {
    @Input() year: number | null = null;

    categories$: Observable<CategoryTeaser[]> | null = null;
    showListView$ = this.store.select(RouterStoreSelectors.isCategoriesListView);
    showGridView$ = this.store.select(RouterStoreSelectors.isCategoriesGridView);
    listThumbnailSize$ = this.store.select(SettingsStoreSelectors.categoryListListViewThumbnailSize);
    gridThumbnailSize$ = this.store.select(SettingsStoreSelectors.categoryListThumbnailSize);
    gridShowTitles$ = this.store.select(SettingsStoreSelectors.categoryListShowCategoryTitles);

    constructor(
        private store: Store
    ) {

    }

    ngOnInit() {
        this.categories$ = this.store.select(CategoriesStoreSelectors.allFilteredCategoriesForYear, { year: this.year as number});
    }
}
