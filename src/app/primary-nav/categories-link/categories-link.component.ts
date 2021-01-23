import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { RouterStoreSelectors } from '@core/root-store';
import { RouteHelper } from '@models';

@Component({
    selector: 'app-primary-nav-categories-link',
    templateUrl: './categories-link.component.html',
    styleUrls: ['./categories-link.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesLinkComponent {
    categoriesLink = RouteHelper.categoriesAbs();
    inCategoryArea$ = this.store.select(RouterStoreSelectors.inCategoryArea);

    constructor(
        private store: Store
    ) {

    }
}
