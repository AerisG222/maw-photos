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
    private static readonly keyPhotoListThumbnailSize = 'photoListThumbnailSize';

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
            photoListThumbnailSize: this.getPhotoListThumbnailSize(),
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
        this._localStorage.store(SettingsService.keyPhotoListThumbnailSize, settings.photoListThumbnailSize.name);
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

        return this.getThumbnailSize(sizeName);
    }

    private getPhotoListThumbnailSize(): ThumbnailSize {
        const sizeName = this._localStorage.retrieve(SettingsService.keyPhotoListThumbnailSize);

        return this.getThumbnailSize(sizeName);
    }

    private getThumbnailSize(sizeName: string): ThumbnailSize {
        try {
            return sizeName !== null ? ThumbnailSize.forName(sizeName) : ThumbnailSize.default;
        } catch {
            return ThumbnailSize.default;
        }
    }
}
