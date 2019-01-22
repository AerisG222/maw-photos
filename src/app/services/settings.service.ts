import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';

import { Settings } from '../models/settings.model';
import { Theme } from '../models/theme.model';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {
    private static readonly KEY_THEME = 'theme';
    private static readonly KEY_SHOW_CATEGORY_TITLES = 'showCategoryTitles';
    private static readonly KEY_SMALL_CATEGORY_THUMBNAILS = 'smallCategoryThumbnails';

    constructor(
        private _localStorage: LocalStorageService
    ) {

    }

    load(): Settings {
        const theme = this._localStorage.retrieve(SettingsService.KEY_THEME);
        const showCategoryTitles = this._localStorage.retrieve(SettingsService.KEY_SHOW_CATEGORY_TITLES);
        const smallCategoryThumbnails = this._localStorage.retrieve(SettingsService.KEY_SMALL_CATEGORY_THUMBNAILS);

        return {
            theme: theme !== null ? Theme.forName(theme) : Theme.THEME_DARK,
            showCategoryTitles: showCategoryTitles !== null ? showCategoryTitles : true,
            smallCategoryThumbnails: smallCategoryThumbnails !== null ? smallCategoryThumbnails : false
        };
    }

    save(settings: Settings) {
        if (!settings) {
            return;
        }

        this._localStorage.store(SettingsService.KEY_THEME, settings.theme.name);
        this._localStorage.store(SettingsService.KEY_SHOW_CATEGORY_TITLES, settings.showCategoryTitles);
        this._localStorage.store(SettingsService.KEY_SMALL_CATEGORY_THUMBNAILS, settings.smallCategoryThumbnails);
    }
}
