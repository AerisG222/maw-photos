import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';

import { Settings } from '../models/settings.model';
import { Theme } from '../models/theme.model';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {
    private static readonly keyTheme = 'theme';
    private static readonly keyShowCategoryTitles = 'showCategoryTitles';
    private static readonly keySmallCategoryThumbnails = 'smallCategoryThumbnails';

    constructor(
        private _localStorage: LocalStorageService
    ) {

    }

    load(): Settings {
        const theme = this._localStorage.retrieve(SettingsService.keyTheme);
        const showCategoryTitles = this._localStorage.retrieve(SettingsService.keyShowCategoryTitles);
        const smallCategoryThumbnails = this._localStorage.retrieve(SettingsService.keySmallCategoryThumbnails);

        return {
            theme: theme !== null ? Theme.forName(theme) : Theme.themeDark,
            showCategoryTitles: showCategoryTitles !== null ? showCategoryTitles : true,
            smallCategoryThumbnails: smallCategoryThumbnails !== null ? smallCategoryThumbnails : false
        };
    }

    save(settings: Settings) {
        if (!settings) {
            return;
        }

        this._localStorage.store(SettingsService.keyTheme, settings.theme.name);
        this._localStorage.store(SettingsService.keyShowCategoryTitles, settings.showCategoryTitles);
        this._localStorage.store(SettingsService.keySmallCategoryThumbnails, settings.smallCategoryThumbnails);
    }
}
