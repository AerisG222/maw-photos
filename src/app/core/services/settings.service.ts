import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';

import { Settings } from 'src/app/core/models/settings.model';
import { Theme } from 'src/app/core/models/theme.model';
import { ThumbnailSize } from 'src/app/core/models/thumbnail-size.model';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {
    private static readonly keyAppTheme = 'appTheme';

    private static readonly keyCategoryListThumbnailSize = 'categoryListThumbnailSize';
    private static readonly keyCategoryListShowCategoryTitles = 'categoryListShowCategoryTitles';

    private static readonly keyPhotoListShowCategoryBreadcrumbs = 'photoListShowCategoryBreadcrumbs';
    private static readonly keyPhotoListThumbnailSize = 'photoListThumbnailSize';
    private static readonly keyPhotoListShowPhotoList = 'photoListShowPhotoList';
    private static readonly keyPhotoListSlideshowDisplayDurationSeconds = 'photoListSlideshowDisplayDurationSeconds';
    private static readonly keyPhotoListToolbarExpandedState = 'photoListToolbarExpandedState';

    private static readonly keyPhotoInfoPanelShowRatings = 'photoInfoPanelShowRatings';
    private static readonly keyPhotoInfoPanelShowComments = 'photoInfoPanelShowComments';
    private static readonly keyPhotoInfoPanelShowExif = 'photoInfoPanelShowExif';
    private static readonly keyPhotoInfoPanelShowEffects = 'photoInfoPanelShowEffects';
    private static readonly keyPhotoInfoPanelShowMinimap = 'photoInfoPanelShowMinimap';
    private static readonly keyPhotoInfoPanelExpandedState = 'photoInfoPanelExpandedState';

    constructor(
        private _localStorage: LocalStorageService
    ) {

    }

    load(): Settings {
        const categoryListShowCategoryTitles = this._localStorage.retrieve(SettingsService.keyCategoryListShowCategoryTitles);

        const photoListShowCategoryBreadcrumbs = this._localStorage.retrieve(SettingsService.keyPhotoListShowCategoryBreadcrumbs);
        const photoListShowPhotoList = this._localStorage.retrieve(SettingsService.keyPhotoListShowPhotoList);
        const photoListToolbarExpandedState = this._localStorage.retrieve(SettingsService.keyPhotoListToolbarExpandedState);

        const photoInfoPanelShowRatings = this._localStorage.retrieve(SettingsService.keyPhotoInfoPanelShowRatings);
        const photoInfoPanelShowComments = this._localStorage.retrieve(SettingsService.keyPhotoInfoPanelShowComments);
        const photoInfoPanelShowExif = this._localStorage.retrieve(SettingsService.keyPhotoInfoPanelShowExif);
        const photoInfoPanelShowEffects = this._localStorage.retrieve(SettingsService.keyPhotoInfoPanelShowEffects);
        const photoInfoPanelShowMinimap = this._localStorage.retrieve(SettingsService.keyPhotoInfoPanelShowMinimap);
        const photoInfoPanelExpandedState = this._localStorage.retrieve(SettingsService.keyPhotoInfoPanelExpandedState);

        return {
            appTheme: this.getTheme(),

            categoryListThumbnailSize: this.getCategoryThumbnailSize(),
            categoryListShowCategoryTitles: categoryListShowCategoryTitles !== null ? categoryListShowCategoryTitles : true,

            photoListThumbnailSize: this.getPhotoListThumbnailSize(),
            photoListSlideshowDisplayDurationSeconds: this.getRandomDisplayDurationSeconds(),
            photoListShowCategoryBreadcrumbs: photoListShowCategoryBreadcrumbs !== null ? photoListShowCategoryBreadcrumbs : true,
            photoListShowPhotoList: photoListShowPhotoList !== null ? photoListShowPhotoList : true,
            photoListToolbarExpandedState: photoListToolbarExpandedState !== null ? photoListToolbarExpandedState : true,

            photoInfoPanelShowRatings: photoInfoPanelShowRatings !== null ? photoInfoPanelShowRatings : true,
            photoInfoPanelShowComments: photoInfoPanelShowComments !== null ? photoInfoPanelShowComments : true,
            photoInfoPanelShowExif: photoInfoPanelShowExif !== null ? photoInfoPanelShowExif : false,
            photoInfoPanelShowEffects: photoInfoPanelShowEffects !== null ? photoInfoPanelShowEffects : false,
            photoInfoPanelShowMinimap: photoInfoPanelShowMinimap !== null ? photoInfoPanelShowMinimap : false,
            photoInfoPanelExpandedState: photoInfoPanelExpandedState !== null ? photoInfoPanelExpandedState : false
        };
    }

    save(settings: Settings) {
        if (!settings) {
            return;
        }

        this._localStorage.store(SettingsService.keyAppTheme, settings.appTheme.name);

        this._localStorage.store(SettingsService.keyCategoryListShowCategoryTitles, settings.categoryListShowCategoryTitles);
        this._localStorage.store(SettingsService.keyCategoryListThumbnailSize, settings.categoryListThumbnailSize.name);

        this._localStorage.store(SettingsService.keyPhotoListShowCategoryBreadcrumbs, settings.photoListShowCategoryBreadcrumbs);
        this._localStorage.store(SettingsService.keyPhotoListThumbnailSize, settings.photoListThumbnailSize.name);
        this._localStorage.store(SettingsService.keyPhotoListShowPhotoList, settings.photoListShowPhotoList);
        // tslint:disable-next-line:max-line-length
        this._localStorage.store(SettingsService.keyPhotoListSlideshowDisplayDurationSeconds, settings.photoListSlideshowDisplayDurationSeconds);
        this._localStorage.store(SettingsService.keyPhotoListToolbarExpandedState, settings.photoListToolbarExpandedState);

        this._localStorage.store(SettingsService.keyPhotoInfoPanelShowComments, settings.photoInfoPanelShowComments);
        this._localStorage.store(SettingsService.keyPhotoInfoPanelShowEffects, settings.photoInfoPanelShowEffects);
        this._localStorage.store(SettingsService.keyPhotoInfoPanelShowExif, settings.photoInfoPanelShowExif);
        this._localStorage.store(SettingsService.keyPhotoInfoPanelShowRatings, settings.photoInfoPanelShowRatings);
        this._localStorage.store(SettingsService.keyPhotoInfoPanelShowMinimap, settings.photoInfoPanelShowMinimap);
        this._localStorage.store(SettingsService.keyPhotoInfoPanelExpandedState, settings.photoInfoPanelExpandedState);
    }

    private getTheme(): Theme {
        const themeName = this._localStorage.retrieve(SettingsService.keyAppTheme);

        try {
            return themeName !== null ? Theme.forName(themeName) : Theme.themeDark;
        } catch {
            return Theme.themeDark;
        }
    }

    private getCategoryThumbnailSize(): ThumbnailSize {
        const sizeName = this._localStorage.retrieve(SettingsService.keyCategoryListThumbnailSize);

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
        const secs = this._localStorage.retrieve(SettingsService.keyPhotoListSlideshowDisplayDurationSeconds);

        try {
            return Number(secs);
        } catch {
            return 3;
        }
    }
}
