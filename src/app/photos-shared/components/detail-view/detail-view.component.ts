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
    showCategoryAsLink$ = this.store.select(RouterStoreSelectors.selectInRandomArea);
    allowCategoryDownload$ = this.store.select(
        RouterStoreSelectors.selectInPhotosArea
    );
    category$ = this.store.select(PhotoStoreSelectors.selectActiveCategory);
    activePhoto$ = this.store.select(PhotoStoreSelectors.selectActivePhoto);
    photos$ = this.store.select(PhotoStoreSelectors.allPhotos);
    settings$ = this.detailSettings.settings$;

    constructor(
        private store: Store,
        private detailSettings: PhotoDetailSettingsFacade
    ) {}
}
