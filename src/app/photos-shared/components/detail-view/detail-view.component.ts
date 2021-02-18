import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { RouterStoreSelectors, PhotoStoreSelectors } from '@core/root-store';
import { PhotoDetailSettingsFacade } from '@core/facades/settings/photo-detail-settings-facade';

@Component({
    selector: 'app-photos-detail-view',
    templateUrl: './detail-view.component.html',
    styleUrls: ['./detail-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailViewComponent {
    showCategoryAsLink$ = this.store.select(RouterStoreSelectors.isRandomView);
    allowCategoryDownload$ = this.store.select(
        RouterStoreSelectors.isPhotosView
    );
    category$ = this.store.select(PhotoStoreSelectors.activeCategory);
    activePhoto$ = this.store.select(PhotoStoreSelectors.activePhoto);
    photos$ = this.store.select(PhotoStoreSelectors.allPhotos);
    settings$ = this.detailSettings.settings$;

    constructor(
        private store: Store,
        private detailSettings: PhotoDetailSettingsFacade
    ) {}
}
