import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';

import { Settings } from '../models/settings.model';
import { Theme } from '../models/theme.model';
import { ThumbnailSize } from '../models/thumbnail-size.model';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {
    private static readonly keyTheme = 'theme';
    private static readonly keyShowCategoryTitles = 'showCategoryTitles';
    private static readonly keyShowCategoryBreadcrumbs = 'showCategoryBreadcrumbs';
    private static readonly keyCategoryThumbnailSize = 'categoryThumbnailSize';

    constructor(
        private _localStorage: LocalStorageService
    ) {

    }

    load(): Settings {
        const showCategoryTitles = this._localStorage.retrieve(SettingsService.keyShowCategoryTitles);
        const showCategoryBreadcrumbs = this._localStorage.retrieve(SettingsService.keyShowCategoryBreadcrumbs);

        return {
            theme: this.getTheme(),
            categoryThumbnailSize: this.getCategoryThumbnailSize(),
            showCategoryTitles: showCategoryTitles !== null ? showCategoryTitles : true,
            showCategoryBreadcrumbs: showCategoryBreadcrumbs != null ? showCategoryBreadcrumbs : true
        };
    }

    save(settings: Settings) {
        if (!settings) {
            return;
        }

        this._localStorage.store(SettingsService.keyTheme, settings.theme.name);
        this._localStorage.store(SettingsService.keyShowCategoryTitles, settings.showCategoryTitles);
        this._localStorage.store(SettingsService.keyCategoryThumbnailSize, settings.categoryThumbnailSize.name);
        this._localStorage.store(SettingsService.keyShowCategoryBreadcrumbs, settings.showCategoryBreadcrumbs);
    }

    private getTheme(): Theme {
        const themeName = this._localStorage.retrieve(SettingsService.keyTheme);

        try {
            return themeName !== null ? Theme.forName(themeName) : Theme.themeDark;
        } catch {
            return Theme.themeDark;
        }
    }

    private getCategoryThumbnailSize(): ThumbnailSize {
        const sizeName = this._localStorage.retrieve(SettingsService.keyCategoryThumbnailSize);

        try {
            return sizeName !== null ? ThumbnailSize.forName(sizeName) : ThumbnailSize.default;
        } catch {
            return ThumbnailSize.default;
        }
    }
}
