import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { SettingsStoreSelectors, RouterStoreSelectors } from '@core/root-store';
import { PhotoStoreSelectors } from '../../../core/root-store/photos-store';
import { PhotoGridSettingsFacade } from '@core/facades/settings/random-grid-settings-facade';

@Component({
    selector: 'app-photos-grid-view',
    templateUrl: './grid-view.component.html',
    styleUrls: ['./grid-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridViewComponent {
    settings$ = this.store.select(SettingsStoreSelectors.selectSettings);
    photos$ = this.store.select(PhotoStoreSelectors.allPhotos);
    activePhoto$ = this.store.select(PhotoStoreSelectors.selectActivePhoto);
    gridSettings$ = this.gridSettings.settings$;
    isRandomView$ = this.store.select(RouterStoreSelectors.selectInRandomArea);

    constructor(
        private store: Store,
        private gridSettings: PhotoGridSettingsFacade
    ) {}
}
