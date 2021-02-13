import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { SearchStoreSelectors } from 'src/app/search/store';
import { RouterStoreSelectors } from '@core/root-store';
import { SearchGridSettingsFacade } from '@core/facades/settings/search-grid-settings-facade';
import { SearchListSettingsFacade } from '@core/facades/settings/search-list-settings-facade';
import { map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';

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
    currentResult$ = this.store.select(SearchStoreSelectors.activeResult);
    showGridView$ = this.store.select(RouterStoreSelectors.isSearchGridView);
    showListView$ = this.store.select(RouterStoreSelectors.isSearchListView);
    gridSettings$ = this.gridSettings.settings$;
    listSettings$ = this.listSettings.settings$;

    margin$ = combineLatest([
        this.showGridView$,
        this.gridSettings$,
        this.listSettings$
    ]).pipe(
        map(([showGrid, gridSettings, listSettings]) => {
            return showGrid ? gridSettings.margin : listSettings.margin;
        })
    );

    constructor(
        private store: Store,
        private gridSettings: SearchGridSettingsFacade,
        private listSettings: SearchListSettingsFacade
    ) {

    }
}
