import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { SettingsStoreActions, SettingsStoreSelectors } from '@core/root-store';
import { BaseSettingsFacade } from './base-settings-facade';
import { nextMargin, nextThumbnailSize, SearchGridViewSettings } from '@models';

@Injectable({
    providedIn: 'root'
})
export class SearchGridSettingsFacade extends BaseSettingsFacade<SearchGridViewSettings> {
    settings$ = this.store.select(SettingsStoreSelectors.searchGridViewSettings);

    constructor(private store: Store) {
        super();
    }

    save(settings: SearchGridViewSettings): void {
        this.store.dispatch(SettingsStoreActions.saveSearchGridViewSettings({ settings }));
    }

    toggleYears(): void {
        this.saveUpdatedField(x => x.showYears = !x.showYears);
    }

    toggleTitles(): void {
        this.saveUpdatedField(x => x.showTitles = !x.showTitles);
    }

    toggleThumbnailSize(): void {
        this.saveUpdatedField(x => x.thumbnailSize = nextThumbnailSize(x.thumbnailSize));
    }

    toggleMargins(): void {
        this.saveUpdatedField(x => x.margin = nextMargin(x.margin));
    }
}
