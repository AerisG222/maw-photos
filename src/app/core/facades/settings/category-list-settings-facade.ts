import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { SettingsStoreActions, SettingsStoreSelectors } from '@core/root-store';
import { CategoryListViewSettings } from '@models';
import { BaseSettingsFacade } from './base-settings-facade';
import { Margin, ThumbnailSize } from '@models';

@Injectable({
    providedIn: 'root',
})
export class CategoryListSettingsFacade extends BaseSettingsFacade<CategoryListViewSettings> {
    settings$ = this.store.select(
        SettingsStoreSelectors.selectCategoryListViewSettings
    );

    constructor(private store: Store) {
        super();
    }

    save(settings: CategoryListViewSettings): void {
        this.store.dispatch(
            SettingsStoreActions.saveCategoryListViewSettings({ settings })
        );
    }

    saveMargin(newMargin: Margin): void {
        this.saveUpdatedField((s) => (s.margin = newMargin));
    }

    saveThumbnailSize(newSize: ThumbnailSize): void {
        this.saveUpdatedField((s) => (s.thumbnailSize = newSize));
    }
}
