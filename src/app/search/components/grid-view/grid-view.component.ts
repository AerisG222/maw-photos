import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { SearchGridSettingsFacade } from '@core/facades/settings/search-grid-settings-facade';
import { SearchStoreSelectors } from '../../store';

@Component({
    selector: 'app-grid-view',
    templateUrl: './grid-view.component.html',
    styleUrls: ['./grid-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridViewComponent {
    categories$ = this.store.select(SearchStoreSelectors.allResultsAsCategories);
    shownResults$ = this.store.select(SearchStoreSelectors.shownResults);
    showNoResults$ = this.store.select(SearchStoreSelectors.showNoResults);
    showTotalResults$ = this.store.select(SearchStoreSelectors.showTotalResults);
    totalResults$ = this.store.select(SearchStoreSelectors.totalResults);
    hasMoreResults$ = this.store.select(SearchStoreSelectors.hasMoreResults);
    gridSettings$ = this.gridSettings.settings$;

    constructor(
        private gridSettings: SearchGridSettingsFacade,
        private store: Store
    ) { }
}
