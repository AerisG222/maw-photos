import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { SettingsStoreActions, SettingsStoreSelectors } from '@core/root-store';
import { BaseSettingsFacade } from './base-settings-facade';
import { nextMargin, SearchListViewSettings, ThumbnailSize } from '@models';

@Injectable({
    providedIn: 'root'
})
export class SearchListSettingsFacade extends BaseSettingsFacade<SearchListViewSettings> {
    settings$ = this.store.select(SettingsStoreSelectors.searchListViewSettings);

    constructor(private store: Store) {
        super();
    }

    save(settings: SearchListViewSettings): void {
        this.store.dispatch(SettingsStoreActions.saveSearchListViewSettings({ settings }));
    }

    toggleThumbnailSize(): void {
        this.saveUpdatedField(x => {
            const newSize = ThumbnailSize.nextSize(x.thumbnailSize.name);
            x.thumbnailSize = newSize;
        });
    }

    toggleMargins(): void {
        this.saveUpdatedField(x => {
            const newSize = nextMargin(x.margin);
            x.margin = newSize;
        });
    }
}
