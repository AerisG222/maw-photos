import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { CategoriesStoreSelectors } from '../../store';
import { CategoryFilterSettingsFacade } from '@core/facades/settings/category-filter-settings-facade';
import { AuthStoreSelectors, RootStoreSelectors } from '@core/root-store';
import { CategoryTypeFilter } from '@models';

@Component({
    selector: 'app-filter-bar',
    templateUrl: './filter-bar.component.html',
    styleUrls: ['./filter-bar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterBarComponent {
    filterSettings$ = this.filterFacade.settings$;
    effectiveYearFilter$ = this.store.select(
        CategoriesStoreSelectors.categoryEffectiveYearFilter
    );
    allYears$ = this.store.select(RootStoreSelectors.allYears);
    isAdmin$ = this.store.select(AuthStoreSelectors.isAdmin);

    constructor(
        private filterFacade: CategoryFilterSettingsFacade,
        private store: Store
    ) {}

    onChangeTypeFilter(evt: CategoryTypeFilter): void {
        this.filterFacade.saveTypeFilter(evt);
    }

    onChangeYearFilter(evt: number | string): void {
        this.filterFacade.saveYearFilter(evt);
    }

    onChangeGpsFilter(evt: boolean): void {
        this.filterFacade.saveMissingGpsFilter(evt);
    }
}
