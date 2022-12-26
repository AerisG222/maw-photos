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
        SearchStoreSelectors.selectAllResultsAsCategories
    );
    shownResults$ = this.store.select(SearchStoreSelectors.selectShownResults);
    showNoResults$ = this.store.select(SearchStoreSelectors.selectShowNoResults);
    showTotalResults$ = this.store.select(
        SearchStoreSelectors.selectShowTotalResults
    );
    totalResults$ = this.store.select(SearchStoreSelectors.selectTotalResults);
    hasMoreResults$ = this.store.select(SearchStoreSelectors.selectHasMoreResults);
    listSettings$ = this.listSettings.settings$;

    constructor(
        private listSettings: SearchListSettingsFacade,
        private store: Store
    ) {}
}
