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
    private static readonly keyShowCategoryPhotoList = 'showCategoryPhotoList';
    private static readonly keyRandomDisplayDurationSeconds = 'randomDisplayDurationSeconds';

    private static readonly keyPhotoInfoPanelShowRatings = 'photoInfoPanelShowRatings';
    private static readonly keyPhotoInfoPanelShowComments = 'photoInfoPanelShowComments';
    private static readonly keyPhotoInfoPanelShowExif = 'photoInfoPanelShowExif';
    private static readonly keyPhotoInfoPanelShowEffects = 'photoInfoPanelShowEffects';

    private static readonly keyPhotoListToolbarExpandedState = 'photoListToolbarExpandedState';

    constructor(
        private _localStorage: LocalStorageService
    ) {

    }

    load(): Settings {
        const showCategoryTitles = this._localStorage.retrieve(SettingsService.keyShowCategoryTitles);
        const showCategoryBreadcrumbs = this._localStorage.retrieve(SettingsService.keyShowCategoryBreadcrumbs);
        const showCategoryPhotoList = this._localStorage.retrieve(SettingsService.keyShowCategoryPhotoList);

        const photoInfoPanelShowRatings = this._localStorage.retrieve(SettingsService.keyPhotoInfoPanelShowRatings);
        const photoInfoPanelShowComments = this._localStorage.retrieve(SettingsService.keyPhotoInfoPanelShowComments);
        const photoInfoPanelShowExif = this._localStorage.retrieve(SettingsService.keyPhotoInfoPanelShowExif);
        const photoInfoPanelShowEffects = this._localStorage.retrieve(SettingsService.keyPhotoInfoPanelShowEffects);

        const photoListToolbarExpandedState = this._localStorage.retrieve(SettingsService.keyPhotoListToolbarExpandedState);

        return {
            theme: this.getTheme(),
            categoryThumbnailSize: this.getCategoryThumbnailSize(),
            photoListThumbnailSize: this.getPhotoListThumbnailSize(),
            randomDisplayDurationSeconds: this.getRandomDisplayDurationSeconds(),
            showCategoryTitles: showCategoryTitles !== null ? showCategoryTitles : true,
            showCategoryBreadcrumbs: showCategoryBreadcrumbs !== null ? showCategoryBreadcrumbs : true,
            showCategoryPhotoList: showCategoryPhotoList !== null ? showCategoryPhotoList : true,
            photoInfoPanelShowRatings: photoInfoPanelShowRatings !== null ? photoInfoPanelShowRatings : true,
            photoInfoPanelShowComments: photoInfoPanelShowComments !== null ? photoInfoPanelShowComments : true,
            photoInfoPanelShowExif: photoInfoPanelShowExif !== null ? photoInfoPanelShowExif : false,
            photoInfoPanelShowEffects: photoInfoPanelShowEffects !== null ? photoInfoPanelShowEffects : false,
            photoListToolbarExpandedState: photoListToolbarExpandedState !== null ? photoListToolbarExpandedState : true
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
        this._localStorage.store(SettingsService.keyShowCategoryPhotoList, settings.showCategoryPhotoList);
        this._localStorage.store(SettingsService.keyRandomDisplayDurationSeconds, settings.randomDisplayDurationSeconds);

        this._localStorage.store(SettingsService.keyPhotoInfoPanelShowComments, settings.photoInfoPanelShowComments);
        this._localStorage.store(SettingsService.keyPhotoInfoPanelShowEffects, settings.photoInfoPanelShowEffects);
        this._localStorage.store(SettingsService.keyPhotoInfoPanelShowExif, settings.photoInfoPanelShowExif);
        this._localStorage.store(SettingsService.keyPhotoInfoPanelShowRatings, settings.photoInfoPanelShowRatings);

        this._localStorage.store(SettingsService.keyPhotoListToolbarExpandedState, settings.photoListToolbarExpandedState);
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

    private getRandomDisplayDurationSeconds(): number {
        const secs = this._localStorage.retrieve(SettingsService.keyRandomDisplayDurationSeconds);

        try {
            return Number(secs);
        } catch {
            return 3;
        }
    }
}
