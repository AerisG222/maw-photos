import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { SearchListSettingsFacade } from '@core/facades/settings/search-list-settings-facade';
import { SearchStoreSelectors } from '../../store';

@Component({
    selector: 'app-list-view',
    templateUrl: './list-view.component.html',
    styleUrls: ['./list-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListViewComponent {
    categories$ = this.store.select(
        SearchStoreSelectors.allResultsAsCategories
    );
    shownResults$ = this.store.select(SearchStoreSelectors.shownResults);
    showNoResults$ = this.store.select(SearchStoreSelectors.showNoResults);
    showTotalResults$ = this.store.select(
        SearchStoreSelectors.showTotalResults
    );
    totalResults$ = this.store.select(SearchStoreSelectors.totalResults);
    hasMoreResults$ = this.store.select(SearchStoreSelectors.hasMoreResults);
    listSettings$ = this.listSettings.settings$;

    constructor(
        private listSettings: SearchListSettingsFacade,
        private store: Store
    ) {}
}
