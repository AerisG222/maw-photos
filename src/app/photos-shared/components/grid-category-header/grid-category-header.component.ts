import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { PhotoStoreSelectors, RouterStoreSelectors } from '@core/root-store';

@Component({
    selector: 'app-grid-category-header',
    templateUrl: './grid-category-header.component.html',
    styleUrls: ['./grid-category-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridCategoryHeaderComponent {
    category$ = this.store.select(PhotoStoreSelectors.selectActiveCategory);
    isRandomView$ = this.store.select(RouterStoreSelectors.selectInRandomArea);

    constructor(private store: Store) {}
}
