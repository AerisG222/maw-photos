import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { SettingsStoreActions, SettingsStoreSelectors } from '@core/root-store';
import { CategoryListViewSettings } from 'src/app/models/settings/category-list-view-settings';
import { BaseSettingsFacade } from './base-settings-facade';
import { CategoryMargin, ThumbnailSize } from '@models';

@Injectable({
    providedIn: 'root'
})
export class CategoryListSettingsFacade extends BaseSettingsFacade<CategoryListViewSettings> {
    settings$ = this.store.select(SettingsStoreSelectors.categoryListViewSettings);

    constructor(private store: Store) {
        super();
    }

    save(settings: CategoryListViewSettings): void {
        this.store.dispatch(SettingsStoreActions.saveCategoryListViewSettings({ settings }));
    }

    saveMargin(newMargin: CategoryMargin) {
        this.saveUpdatedField(s => s.margin = newMargin);
    }

    saveThumbnailSize(newSize: ThumbnailSize) {
        this.saveUpdatedField(s => s.thumbnailSize = newSize);
    }
}
