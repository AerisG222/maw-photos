import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { PhotoCategoryStoreSelectors, RouterStoreSelectors, SettingsStoreSelectors, PhotoStoreSelectors } from '@core/root-store';

@Component({
    selector: 'app-photos-detail-view',
    templateUrl: './detail-view.component.html',
    styleUrls: ['./detail-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailViewComponent {
    showCategoryAsLink$ = this.store.select(RouterStoreSelectors.isRandomView);
    allowCategoryDownload$ = this.store.select(RouterStoreSelectors.isPhotosView);
    category$ = this.store.select(PhotoCategoryStoreSelectors.activeCategory);
    activePhoto$ = this.store.select(PhotoStoreSelectors.activePhoto);
    photos$ = this.store.select(PhotoStoreSelectors.allPhotos);
    settings$ = this.store.select(SettingsStoreSelectors.settings);

    constructor(
        private store: Store,

    ) {

    }
}
