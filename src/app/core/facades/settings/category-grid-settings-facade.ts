import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { SettingsStoreActions, SettingsStoreSelectors } from '@core/root-store';
import { CategoryGridViewSettings } from 'src/app/models/settings/category-grid-view-settings';
import { BaseSettingsFacade } from './base-settings-facade';
import { CategoryMargin, ThumbnailSize } from '@models';

@Injectable({
    providedIn: 'root'
})
export class CategoryGridSettingsFacade extends BaseSettingsFacade<CategoryGridViewSettings> {
    settings$ = this.store.select(SettingsStoreSelectors.categoryGridViewSettings);

    constructor(private store: Store) {
        super();
    }

    save(settings: CategoryGridViewSettings): void {
        this.store.dispatch(SettingsStoreActions.saveCategoryGridViewSettings({ settings }));
    }

    saveMargin(newMargin: CategoryMargin) {
        this.saveUpdatedField(s => s.margin = newMargin);
    }

    saveShowTitles(doShow: boolean) {
        this.saveUpdatedField(s => s.showTitles = doShow);
    }

    saveThumbnailSize(newSize: ThumbnailSize) {
        this.saveUpdatedField(s => s.thumbnailSize = newSize);
    }
}
