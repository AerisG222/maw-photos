import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { SettingsStoreSelectors, AuthStoreSelectors, RootStoreSelectors } from '@core/root-store';
import { CategoriesStoreSelectors } from '../../store';
import { CategoryFilterSettingsFacade } from '@core/facades/settings/category-filter-settings-facade';
import { CategoryTypeFilter } from '@models';

@Component({
    selector: 'app-categories-year-list',
    templateUrl: './year-list.component.html',
    styleUrls: ['./year-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class YearListComponent {
    filterSettings$ = this.filterFacade.settings$;

    allYears$ = this.store.select(RootStoreSelectors.allYears);
    margin$ = this.store.select(SettingsStoreSelectors.categoryListCategoryMargin);
    years$ = this.store.select(CategoriesStoreSelectors.allFilteredCategoryYears);
    isAdmin$ = this.store.select(AuthStoreSelectors.isAdmin);

    constructor(
        private filterFacade: CategoryFilterSettingsFacade,
        private store: Store
    ) {

    }

    onChangeTypeFilter(evt: CategoryTypeFilter) {
        this.filterFacade.saveTypeFilter(evt);
    }

    onChangeYearFilter(evt: number | string) {
        this.filterFacade.saveYearFilter(evt);
    }

    onChangeGpsFilter(evt: boolean) {
        this.filterFacade.saveMissingGpsFilter(evt);
    }
}
