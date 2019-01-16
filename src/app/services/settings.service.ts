import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';

import { ISettings } from '../models/isettings.model';
import { Theme } from '../models/theme.model';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {
    private static readonly KEY_THEME = 'theme';

    constructor(
        private _localStorage: LocalStorageService
    ) {

    }

    load(): ISettings {
        const theme = this._localStorage.retrieve(SettingsService.KEY_THEME);

        return {
            theme: theme !== null ? Theme.forName(theme) : Theme.THEME_DARK
        };
    }

    save(settings: ISettings) {
        if (!settings) {
            return;
        }

        this._localStorage.store(SettingsService.KEY_THEME, settings.theme.name);
    }
}
