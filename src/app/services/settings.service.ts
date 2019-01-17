import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';

import { ISettings } from '../models/isettings.model';
import { Theme } from '../models/theme.model';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {
    private static readonly KEY_THEME = 'theme';
    private static readonly KEY_SHOW_CATEGORY_TITLES = 'showCategoryTitles';

    constructor(
        private _localStorage: LocalStorageService
    ) {

    }

    load(): ISettings {
        const theme = this._localStorage.retrieve(SettingsService.KEY_THEME);
        const showCategoryTitles = this._localStorage.retrieve(SettingsService.KEY_SHOW_CATEGORY_TITLES);

        return {
            theme: theme !== null ? Theme.forName(theme) : Theme.THEME_DARK,
            showCategoryTitles: showCategoryTitles !== null ? showCategoryTitles : true
        };
    }

    save(settings: ISettings) {
        if (!settings) {
            return;
        }

        this._localStorage.store(SettingsService.KEY_THEME, settings.theme.name);
        this._localStorage.store(SettingsService.KEY_SHOW_CATEGORY_TITLES, settings.showCategoryTitles);
    }
}
