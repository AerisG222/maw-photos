import { Injectable } from '@angular/core';

import {
    Settings,
    DEFAULT_SETTINGS,
    Theme,
    ThumbnailSize,
    VideoSize,
    CategoryMargin,
    CategoryTypeFilter,
    CategoryViewMode,
    toCategoryTypeFilter,
    toCategoryViewMode,
    PhotoViewMode,
    toPhotoViewMode,
    MapType,
    toMapType,
 } from '@models';
import { LocalStorageService } from './local-storage.service';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {
    private static readonly keyAuthRedirectUrl = 'authRedirectUrl';

    private static readonly keyAppTheme = 'appTheme';

    private static readonly keyCategoryListCategoryFilter = 'categoryListCategoryFilter';
    private static readonly keyCategoryListCategoryMargin = 'categoryListCategoryMargin';
    private static readonly keyCategoryListMissingGpsFilter = 'categoryListMissingGpsFilter';
    private static readonly keyCategoryListThumbnailSize = 'categoryListThumbnailSize';
    private static readonly keyCategoryListShowCategoryTitles = 'categoryListShowCategoryTitles';
    private static readonly keyCategoryListYearFilter = 'categoryListYearFilter';
    private static readonly keyCategoryListViewMode = 'categoryListViewMode';
    private static readonly keyCategoryListListViewThumbnailSize = 'categoryListListViewThumbnailSize';

    private static readonly keyPhotoListShowCategoryBreadcrumbs = 'photoListShowCategoryBreadcrumbs';
    private static readonly keyPhotoListThumbnailSize = 'photoListThumbnailSize';
    private static readonly keyPhotoListShowPhotoList = 'photoListShowPhotoList';
    private static readonly keyPhotoListSlideshowDisplayDurationSeconds = 'photoListSlideshowDisplayDurationSeconds';
    private static readonly keyPhotoListMapViewMapType = 'photoListMapViewMapTypeId';
    private static readonly keyPhotoListMapViewZoom = 'photoListMapViewZoom';

    private static readonly keyPhotoGridMargin = 'photoGridMargin';
    private static readonly keyPhotoGridShowCategoryBreadcrumbs = 'photoGridShowCategoryBreadcrumbs';
    private static readonly keyPhotoGridThumbnailSize = 'photoGridThumbnailSize';

    private static readonly keyPhotoInfoPanelShowRatings = 'photoInfoPanelShowRatings';
    private static readonly keyPhotoInfoPanelShowCategoryTeaserChooser = 'photoInfoPanelShowCategoryTeaserChooser';
    private static readonly keyPhotoInfoPanelShowComments = 'photoInfoPanelShowComments';
    private static readonly keyPhotoInfoPanelShowExif = 'photoInfoPanelShowExif';
    private static readonly keyPhotoInfoPanelShowEffects = 'photoInfoPanelShowEffects';
    private static readonly keyPhotoInfoPanelShowHistogram = 'photoInfoPanelShowHistogram';
    private static readonly keyPhotoInfoPanelShowMetadataEditor = 'photoInfoPanelShowMetadataEditor';
    private static readonly keyPhotoInfoPanelShowMinimap = 'photoInfoPanelShowMinimap';
    private static readonly keyPhotoInfoPanelExpandedState = 'photoInfoPanelExpandedState';
    private static readonly keyPhotoInfoPanelMinimapMapType = 'photoInfoPanelMinimapMapTypeId';
    private static readonly keyPhotoInfoPanelMinimapZoom = 'photoInfoPanelMinimapZoom';

    private static readonly keyPhotoViewMode = 'photoViewMode';

    private static readonly keyVideoListShowCategoryBreadcrumbs = 'videoListShowCategoryBreadcrumbs';
    private static readonly keyVideoListThumbnailSize = 'videoListThumbnailSize';
    private static readonly keyVideoListShowVideoList = 'videoListShowVideoList';
    private static readonly keyVideoListVideoSize = 'videoListVideoSize';

    private static readonly keyVideoInfoPanelShowRatings = 'videoInfoPanelShowRatings';
    private static readonly keyVideoInfoPanelShowCategoryTeaserChooser = 'videoInfoPanelShowCategoryTeaserChooser';
    private static readonly keyVideoInfoPanelShowComments = 'videoInfoPanelShowComments';
    private static readonly keyVideoInfoPanelShowMetadataEditor = 'videoInfoPanelShowMetadataEditor';
    private static readonly keyVideoInfoPanelShowMinimap = 'videoInfoPanelShowMinimap';
    private static readonly keyVideoInfoPanelExpandedState = 'videoInfoPanelExpandedState';
    private static readonly keyVideoInfoPanelMinimapMapType = 'videoInfoPanelMinimapMapTypeId';
    private static readonly keyVideoInfoPanelMinimapZoom = 'videoInfoPanelMinimapZoom';

    private static readonly keySearchCategoryMargin = 'searchCategoryMargin';
    private static readonly keySearchThumbnailSize = 'searchThumbnailSize';
    private static readonly keySearchShowCategoryTitles = 'searchShowCategoryTitles';
    private static readonly keySearchShowCategoryYears = 'searchShowCategoryYears';
    private static readonly keySearchViewMode = 'searchViewMode';
    private static readonly keySearchListViewThumbnailSize = 'searchListViewThumbnailSize';

    private static readonly removedKeyCategoryListYearFilter = 'categoryListYearFilterEnabled';
    private static readonly removedKeyCategoryListToolbarExpandedState = 'categoryListToolbarExpandedState';
    private static readonly removedKeyPhotoListToolbarExpandedState = 'photoListToolbarExpandedState';
    private static readonly removedKeyPhotoListFullscreenToolbarExpandedState = 'photoListFullscreenToolbarExpandedState';
    private static readonly removedKeyVideoListToolbarExpandedState = 'videoListToolbarExpandedState';
    private static readonly removedKeyCategoryListListType = 'categoryListListType';
    private static readonly removedKeySearchListType = 'searchListType';

    constructor(
        private localStorage: LocalStorageService
    ) {

    }

    /* eslint-disable max-len */
    load(): Settings {
        try {
            return {
                appTheme: this.getTheme(),

                categoryListCategoryFilter:        this.getCategoryListCategoryFilter(),
                categoryListCategoryMargin:        this.getCategoryMargin(SettingsService.keyCategoryListCategoryMargin),
                categoryListMissingGpsFilter:      this.getBoolean(SettingsService.keyCategoryListMissingGpsFilter),
                categoryListThumbnailSize:         this.getCategoryThumbnailSize(SettingsService.keyCategoryListThumbnailSize),
                categoryListShowCategoryTitles:    this.getBoolean(SettingsService.keyCategoryListShowCategoryTitles),
                categoryListYearFilter:            this.getStringOrNumber(SettingsService.keyCategoryListYearFilter),
                categoryListViewMode:              this.getCategoryViewMode(SettingsService.keyCategoryListViewMode),
                categoryListListViewThumbnailSize: this.getCategoryThumbnailSize(SettingsService.keyCategoryListListViewThumbnailSize),

                photoListThumbnailSize:                   this.getPhotoListThumbnailSize(),
                photoListSlideshowDisplayDurationSeconds: this.getPhotoListSlideshowDisplayDurationSeconds(),
                photoListShowCategoryBreadcrumbs:         this.getBoolean(SettingsService.keyPhotoListShowCategoryBreadcrumbs),
                photoListShowPhotoList:                   this.getBoolean(SettingsService.keyPhotoListShowPhotoList),
                photoListMapViewMapType:                this.getMapType(SettingsService.keyPhotoListMapViewMapType, DEFAULT_SETTINGS.photoListMapViewMapType),
                photoListMapViewZoom:                     this.getNumber(SettingsService.keyPhotoListMapViewZoom) ?? DEFAULT_SETTINGS.photoListMapViewZoom,

                photoGridMargin: this.getCategoryMargin(SettingsService.keyPhotoGridMargin),
                photoGridShowCategoryBreadcrumbs: this.getBoolean(SettingsService.keyPhotoGridShowCategoryBreadcrumbs),
                photoGridThumbnailSize: this.getCategoryThumbnailSize(SettingsService.keyPhotoGridThumbnailSize),

                photoInfoPanelShowRatings:               this.getBoolean(SettingsService.keyPhotoInfoPanelShowRatings),
                photoInfoPanelShowCategoryTeaserChooser: this.getBoolean(SettingsService.keyPhotoInfoPanelShowCategoryTeaserChooser),
                photoInfoPanelShowComments:              this.getBoolean(SettingsService.keyPhotoInfoPanelShowComments),
                photoInfoPanelShowExif:                  this.getBoolean(SettingsService.keyPhotoInfoPanelShowExif),
                photoInfoPanelShowEffects:               this.getBoolean(SettingsService.keyPhotoInfoPanelShowEffects),
                photoInfoPanelShowHistogram:             this.getBoolean(SettingsService.keyPhotoInfoPanelShowHistogram),
                photoInfoPanelShowMetadataEditor:        this.getBoolean(SettingsService.keyPhotoInfoPanelShowMetadataEditor),
                photoInfoPanelShowMinimap:               this.getBoolean(SettingsService.keyPhotoInfoPanelShowMinimap),
                photoInfoPanelExpandedState:             this.getBoolean(SettingsService.keyPhotoInfoPanelExpandedState),
                photoInfoPanelMinimapMapType:          this.getMapType(SettingsService.keyPhotoInfoPanelMinimapMapType, DEFAULT_SETTINGS.photoInfoPanelMinimapMapType),
                photoInfoPanelMinimapZoom:               this.getNumber(SettingsService.keyPhotoInfoPanelMinimapZoom) ?? DEFAULT_SETTINGS.photoInfoPanelMinimapZoom,

                photoViewMode: this.getPhotoViewMode(SettingsService.keyPhotoViewMode),

                videoListShowCategoryBreadcrumbs: this.getBoolean(SettingsService.keyVideoListShowCategoryBreadcrumbs),
                videoListThumbnailSize:           this.getVideoListThumbnailSize(),
                videoListShowVideoList:           this.getBoolean(SettingsService.keyVideoListShowVideoList),
                videoListVideoSize:               this.getVideoListVideoSize(),

                videoInfoPanelShowRatings:               this.getBoolean(SettingsService.keyVideoInfoPanelShowRatings),
                videoInfoPanelShowCategoryTeaserChooser: this.getBoolean(SettingsService.keyVideoInfoPanelShowCategoryTeaserChooser),
                videoInfoPanelShowComments:              this.getBoolean(SettingsService.keyVideoInfoPanelShowComments),
                videoInfoPanelShowMetadataEditor:        this.getBoolean(SettingsService.keyVideoInfoPanelShowMetadataEditor),
                videoInfoPanelShowMinimap:               this.getBoolean(SettingsService.keyVideoInfoPanelShowMinimap),
                videoInfoPanelExpandedState:             this.getBoolean(SettingsService.keyVideoInfoPanelExpandedState),
                videoInfoPanelMinimapMapType:          this.getMapType(SettingsService.keyVideoInfoPanelMinimapMapType, DEFAULT_SETTINGS.videoInfoPanelMinimapMapType),
                videoInfoPanelMinimapZoom:               this.getNumber(SettingsService.keyVideoInfoPanelMinimapZoom) ?? DEFAULT_SETTINGS.videoInfoPanelMinimapZoom,

                searchCategoryMargin:        this.getCategoryMargin(SettingsService.keySearchCategoryMargin),
                searchThumbnailSize:         this.getCategoryThumbnailSize(SettingsService.keySearchThumbnailSize),
                searchShowCategoryTitles:    this.getBoolean(SettingsService.keySearchShowCategoryTitles),
                searchShowCategoryYears:     this.getBoolean(SettingsService.keySearchShowCategoryYears),
                searchViewMode:              this.getCategoryViewMode(SettingsService.keySearchViewMode),
                searchListViewThumbnailSize: this.getCategoryThumbnailSize(SettingsService.keySearchListViewThumbnailSize),
            };
        } catch (e) {
            return DEFAULT_SETTINGS;
        }
    }
    // tslint:restore: max-line-length

    save(settings: Settings): void {
        if (!settings) {
            return;
        }

        this.setValue(SettingsService.keyAppTheme, settings.appTheme.name);

        this.setValue(SettingsService.keyCategoryListCategoryFilter, settings.categoryListCategoryFilter);
        this.setValue(SettingsService.keyCategoryListCategoryMargin, settings.categoryListCategoryMargin.name);
        this.setBoolean(SettingsService.keyCategoryListMissingGpsFilter, settings.categoryListMissingGpsFilter);
        this.setBoolean(SettingsService.keyCategoryListShowCategoryTitles, settings.categoryListShowCategoryTitles);
        this.setValue(SettingsService.keyCategoryListThumbnailSize, settings.categoryListThumbnailSize.name);
        this.setValue(SettingsService.keyCategoryListYearFilter, settings.categoryListYearFilter.toString());
        this.setValue(SettingsService.keyCategoryListViewMode, settings.categoryListViewMode);
        this.setValue(SettingsService.keyCategoryListListViewThumbnailSize, settings.categoryListListViewThumbnailSize.name);

        this.setBoolean(SettingsService.keyPhotoListShowCategoryBreadcrumbs, settings.photoListShowCategoryBreadcrumbs);
        this.setValue(SettingsService.keyPhotoListThumbnailSize, settings.photoListThumbnailSize.name);
        this.setBoolean(SettingsService.keyPhotoListShowPhotoList, settings.photoListShowPhotoList);
        this.setNumber(SettingsService.keyPhotoListSlideshowDisplayDurationSeconds, settings.photoListSlideshowDisplayDurationSeconds);
        this.setValue(SettingsService.keyPhotoListMapViewMapType, settings.photoListMapViewMapType);
        this.setNumber(SettingsService.keyPhotoListMapViewZoom, settings.photoListMapViewZoom);

        this.setValue(SettingsService.keyPhotoGridMargin, settings.photoGridMargin.name);
        this.setBoolean(SettingsService.keyPhotoGridShowCategoryBreadcrumbs, settings.photoGridShowCategoryBreadcrumbs);
        this.setValue(SettingsService.keyPhotoGridThumbnailSize, settings.photoGridThumbnailSize.name);

        this.setBoolean(SettingsService.keyPhotoInfoPanelShowCategoryTeaserChooser, settings.photoInfoPanelShowCategoryTeaserChooser);
        this.setBoolean(SettingsService.keyPhotoInfoPanelShowComments, settings.photoInfoPanelShowComments);
        this.setBoolean(SettingsService.keyPhotoInfoPanelShowEffects, settings.photoInfoPanelShowEffects);
        this.setBoolean(SettingsService.keyPhotoInfoPanelShowExif, settings.photoInfoPanelShowExif);
        this.setBoolean(SettingsService.keyPhotoInfoPanelShowHistogram, settings.photoInfoPanelShowHistogram);
        this.setBoolean(SettingsService.keyPhotoInfoPanelShowRatings, settings.photoInfoPanelShowRatings);
        this.setBoolean(SettingsService.keyPhotoInfoPanelShowMetadataEditor, settings.photoInfoPanelShowMetadataEditor);
        this.setBoolean(SettingsService.keyPhotoInfoPanelShowMinimap, settings.photoInfoPanelShowMinimap);
        this.setBoolean(SettingsService.keyPhotoInfoPanelExpandedState, settings.photoInfoPanelExpandedState);
        this.setValue(SettingsService.keyPhotoInfoPanelMinimapMapType, settings.photoInfoPanelMinimapMapType);
        this.setNumber(SettingsService.keyPhotoInfoPanelMinimapZoom, settings.photoInfoPanelMinimapZoom);

        this.setValue(SettingsService.keyPhotoViewMode, settings.photoViewMode);

        this.setBoolean(SettingsService.keyVideoListShowCategoryBreadcrumbs, settings.videoListShowCategoryBreadcrumbs);
        this.setBoolean(SettingsService.keyVideoListShowVideoList, settings.videoListShowVideoList);
        this.setValue(SettingsService.keyVideoListThumbnailSize, settings.videoListThumbnailSize.name);
        this.setValue(SettingsService.keyVideoListVideoSize, settings.videoListVideoSize.name);

        this.setBoolean(SettingsService.keyVideoInfoPanelExpandedState, settings.videoInfoPanelExpandedState);
        this.setBoolean(SettingsService.keyVideoInfoPanelShowCategoryTeaserChooser, settings.videoInfoPanelShowCategoryTeaserChooser);
        this.setBoolean(SettingsService.keyVideoInfoPanelShowComments, settings.videoInfoPanelShowComments);
        this.setBoolean(SettingsService.keyVideoInfoPanelShowMetadataEditor, settings.videoInfoPanelShowMetadataEditor);
        this.setBoolean(SettingsService.keyVideoInfoPanelShowMinimap, settings.videoInfoPanelShowMinimap);
        this.setBoolean(SettingsService.keyVideoInfoPanelShowRatings, settings.videoInfoPanelShowRatings);
        this.setValue(SettingsService.keyVideoInfoPanelMinimapMapType, settings.videoInfoPanelMinimapMapType);
        this.setNumber(SettingsService.keyVideoInfoPanelMinimapZoom, settings.videoInfoPanelMinimapZoom);

        this.setValue(SettingsService.keySearchCategoryMargin, settings.searchCategoryMargin.name);
        this.setBoolean(SettingsService.keySearchShowCategoryTitles, settings.searchShowCategoryTitles);
        this.setBoolean(SettingsService.keySearchShowCategoryYears, settings.searchShowCategoryYears);
        this.setValue(SettingsService.keySearchThumbnailSize, settings.searchThumbnailSize.name);
        this.setValue(SettingsService.keySearchViewMode, settings.searchViewMode);
        this.setValue(SettingsService.keySearchListViewThumbnailSize, settings.searchListViewThumbnailSize.name);

        this.killRemovedSettings();
    }

    killRemovedSettings(): void {
        this.clearValue(SettingsService.removedKeyCategoryListYearFilter);
        this.clearValue(SettingsService.removedKeyCategoryListToolbarExpandedState);
        this.clearValue(SettingsService.removedKeyPhotoListToolbarExpandedState);
        this.clearValue(SettingsService.removedKeyPhotoListFullscreenToolbarExpandedState);
        this.clearValue(SettingsService.removedKeyVideoListToolbarExpandedState);
        this.clearValue(SettingsService.removedKeyCategoryListListType);
        this.clearValue(SettingsService.removedKeySearchListType);
    }

    clearAuthRedirectUrl(): void {
        this.clearValue(SettingsService.keyAuthRedirectUrl);
    }

    setAuthRedirectUrl(url: string): void {
        this.setValue(SettingsService.keyAuthRedirectUrl, url);
    }

    getAuthRedirectUrl(): string {
        const url = this.getStringOrNull(SettingsService.keyAuthRedirectUrl);

        if (!!url) {
            return url;
        }

        console.error('did not obtain valid auth redirect url');

        return '';
    }

    private getTheme(): Theme {
        const themeName = this.getStringOrNull(SettingsService.keyAppTheme);

        try {
            return themeName !== null ? Theme.forName(themeName) : Theme.themeDark;
        } catch {
            return Theme.themeDark;
        }
    }

    private getPhotoViewMode(key: string): PhotoViewMode {
        const name = this.getStringOrNull(key);

        try {
            return toPhotoViewMode(name) ?? PhotoViewMode.grid;
        } catch {
            return PhotoViewMode.grid;
        }
    }

    private getCategoryViewMode(key: string): CategoryViewMode {
        const name = this.getStringOrNull(key);

        try {
            return toCategoryViewMode(name) ?? CategoryViewMode.grid;
        } catch {
            return CategoryViewMode.grid;
        }
    }

    private getCategoryListCategoryFilter(): CategoryTypeFilter {
        const name = this.getStringOrNull(SettingsService.keyCategoryListCategoryFilter);

        try {
            return toCategoryTypeFilter(name) ?? CategoryTypeFilter.all;
        } catch {
            return CategoryTypeFilter.all;
        }
    }

    private getMapType(key: string, defaultValue: MapType): MapType {
        const name = this.getStringOrNull(key);

        try {
            return toMapType(name) ?? defaultValue;
        } catch {
            return defaultValue;
        }
    }

    private getCategoryMargin(key: string): CategoryMargin {
        const name = this.getStringOrNull(key);

        try {
            return name !== null ? CategoryMargin.forName(name) : CategoryMargin.compact;
        } catch {
            return CategoryMargin.compact;
        }
    }

    private getCategoryThumbnailSize(key: string): ThumbnailSize {
        const sizeName = this.getStringOrNull(key);

        if (!!sizeName) {
            return this.getThumbnailSize(sizeName);
        }

        return DEFAULT_SETTINGS.categoryListThumbnailSize;
    }

    private getPhotoListThumbnailSize(): ThumbnailSize {
        const sizeName = this.getStringOrNull(SettingsService.keyPhotoListThumbnailSize);

        if (!!sizeName) {
            return this.getThumbnailSize(sizeName);
        }

        return DEFAULT_SETTINGS.photoListThumbnailSize;
    }

    private getVideoListThumbnailSize(): ThumbnailSize {
        const sizeName = this.getStringOrNull(SettingsService.keyVideoListThumbnailSize);

        if (!!sizeName) {
            return this.getThumbnailSize(sizeName);
        }

        return DEFAULT_SETTINGS.videoListThumbnailSize;
    }

    private getVideoListVideoSize(): VideoSize {
        const sizeName = this.getStringOrNull(SettingsService.keyVideoListVideoSize);

        try {
            return sizeName !== null ? VideoSize.forName(sizeName) : VideoSize.large;
        } catch {
            return VideoSize.large;
        }
    }

    private getThumbnailSize(sizeName: string): ThumbnailSize {
        try {
            return sizeName !== null ? ThumbnailSize.forName(sizeName) : ThumbnailSize.default;
        } catch {
            return ThumbnailSize.default;
        }
    }

    private getPhotoListSlideshowDisplayDurationSeconds(): number {
        const def = 2;
        const secs = this.getNumber(SettingsService.keyPhotoListSlideshowDisplayDurationSeconds);

        if (!!secs) {
            return secs;
        }

        return def;
    }

    private getStringOrNumber(key: string): string | number {
        const value = this.getStringOrNull(key)?.toLowerCase();

        if (!!value) {
            return /^\d+$/.test(value) ? parseInt(value, 10) : value;
        }

        console.error('did not obtain a string or number!');

        return '';
    }

    private getNumber(key: string): number | null {
        const value = this.getStringOrNull(key);

        if (!!value) {
            return /^\d+$/.test(value) ? parseInt(value, 10) : null;
        }

        return null;
    }

    private getBoolean(key: string): boolean {
        const value = this.getStringOrNull(key);

        if (!!value) {
            return /^true$/i.test(value);
        }

        return false;
    }

    private getStringOrNull(key: string): string | null {
        const val = this.localStorage.getStringOrNull(key);

        if (!!val) {
            return val.replace('\'', '').replace('"', '');
        }

        return null;
    }

    private setValue(key: string, value: string): void {
        this.localStorage.setString(key, value);
    }

    private setBoolean(key: string, value: boolean): void {
        this.localStorage.setString(key, value.toString());
    }

    private setNumber(key: string, value: number): void {
        this.localStorage.setString(key, value.toString());
    }

    private clearValue(key: string): void {
        this.localStorage.clear(key);
    }
}
