import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { SearchGridSettingsFacade } from '@core/facades/settings/search-grid-settings-facade';
import { SearchStoreSelectors } from '../../store';

@Component({
    selector: 'app-grid-view',
    templateUrl: './grid-view.component.html',
    styleUrls: ['./grid-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridViewComponent {
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
    gridSettings$ = this.gridSettings.settings$;

    constructor(
        private gridSettings: SearchGridSettingsFacade,
        private store: Store
    ) {}
}
