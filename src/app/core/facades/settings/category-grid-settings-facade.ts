import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { SettingsStoreActions, SettingsStoreSelectors } from '@core/root-store';
import { CategoryGridViewSettings } from '@models';
import { BaseSettingsFacade } from './base-settings-facade';
import { Margin, ThumbnailSize } from '@models';

@Injectable({
    providedIn: 'root',
})
export class CategoryGridSettingsFacade extends BaseSettingsFacade<CategoryGridViewSettings> {
    settings$ = this.store.select(
        SettingsStoreSelectors.categoryGridViewSettings
    );

    constructor(private store: Store) {
        super();
    }

    save(settings: CategoryGridViewSettings): void {
        this.store.dispatch(
            SettingsStoreActions.saveCategoryGridViewSettings({ settings })
        );
    }

    saveMargin(newMargin: Margin): void {
        this.saveUpdatedField((s) => (s.margin = newMargin));
    }

    saveShowTitles(doShow: boolean): void {
        this.saveUpdatedField((s) => (s.showTitles = doShow));
    }

    saveThumbnailSize(newSize: ThumbnailSize): void {
        this.saveUpdatedField((s) => (s.thumbnailSize = newSize));
    }
}
