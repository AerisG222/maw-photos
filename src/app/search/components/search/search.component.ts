import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { SearchStoreSelectors } from 'src/app/search/store';
import { RouterStoreSelectors, SettingsStoreSelectors } from '@core/root-store';

@Component({
    selector: 'app-search-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent {
    shownResults$ = this.store.select(SearchStoreSelectors.shownResults);
    showNoResults$ = this.store.select(SearchStoreSelectors.showNoResults);
    showTotalResults$ = this.store.select(SearchStoreSelectors.showTotalResults);
    categories$ = this.store.select(SearchStoreSelectors.allResultsAsCategories);
    totalResults$ = this.store.select(SearchStoreSelectors.totalResults);
    hasMoreResults$ = this.store.select(SearchStoreSelectors.hasMoreResults);
    margin$ = this.store.select(SettingsStoreSelectors.searchCategoryMargin);
    currentResult$ = this.store.select(SearchStoreSelectors.activeResult);
    gridShowTitles$ = this.store.select(SettingsStoreSelectors.searchShowCategoryTitles);
    gridShowYears$ = this.store.select(SettingsStoreSelectors.searchShowCategoryYears);
    listThumbnailSize$ = this.store.select(SettingsStoreSelectors.searchListViewThumbnailSize);
    gridThumbnailSize$ = this.store.select(SettingsStoreSelectors.searchThumbnailSize);
    showGridView$ = this.store.select(RouterStoreSelectors.isSearchGridView);
    showListView$ = this.store.select(RouterStoreSelectors.isSearchListView);

    constructor(
        private store: Store
    ) {

    }
}
