import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { SettingsStoreActions, SettingsStoreSelectors } from '@core/root-store';
import { BaseSettingsFacade } from './base-settings-facade';
import { Margin, SearchGridViewSettings, ThumbnailSize } from '@models';

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
        this.saveUpdatedField(x => {
            const newSize = ThumbnailSize.nextSize(x.thumbnailSize.name);
            x.thumbnailSize = newSize;
        });
    }

    toggleMargins(): void {
        this.saveUpdatedField(x => {
            const newSize = Margin.nextSize(x.margin.name);
            x.margin = newSize;
        });
    }
}
