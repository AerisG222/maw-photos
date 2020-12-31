import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { PhotoStoreSelectors } from 'src/app/core/root-store/photos-store';

@Component({
    selector: 'app-photos-photo-category',
    templateUrl: './photo-category.component.html',
    styleUrls: ['./photo-category.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoCategoryComponent {
    isFullscreen$ = this.store.select(PhotoStoreSelectors.isFullscreenView);
    isMapView$ = this.store.select(PhotoStoreSelectors.isMapView);
    isBulkEditView$ = this.store.select(PhotoStoreSelectors.isBulkEditView);
    isGridView$ = this.store.select(PhotoStoreSelectors.isGridView);

    constructor(
        private store: Store
    ) {

    }
}
