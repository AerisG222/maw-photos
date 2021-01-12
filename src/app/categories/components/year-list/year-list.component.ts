import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { SettingsStoreSelectors, AuthStoreSelectors } from '@core/root-store';
import { CategoriesStoreSelectors } from '../../store';

@Component({
    selector: 'app-categories-year-list',
    templateUrl: './year-list.component.html',
    styleUrls: ['./year-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class YearListComponent {
    margin$ = this.store.select(SettingsStoreSelectors.categoryListCategoryMargin);
    years$ = this.store.select(CategoriesStoreSelectors.allFilteredCategoryYears);
    isAdmin$ = this.store.select(AuthStoreSelectors.isAdmin);

    constructor(
        private store: Store
    ) {

    }
}
