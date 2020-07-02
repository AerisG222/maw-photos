import { Injectable } from '@angular/core';

import { Settings, DEFAULT_SETTINGS } from 'src/app/models/settings.model';
import { Theme } from 'src/app/models/theme.model';
import { ThumbnailSize } from 'src/app/models/thumbnail-size.model';
import { VideoSize } from 'src/app/models/video-size.model';
import { CategoryMargin } from 'src/app/models/category-margin.model';
import { CategoryFilter } from 'src/app/models/category-filter.model';
import { CategoryListType } from 'src/app/models/category-list-type.model';
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
    private static readonly keyCategoryListListType = 'categoryListListType';
    private static readonly keyCategoryListListViewThumbnailSize = 'categoryListListViewThumbnailSize';

    private static readonly keyPhotoListShowCategoryBreadcrumbs = 'photoListShowCategoryBreadcrumbs';
    private static readonly keyPhotoListThumbnailSize = 'photoListThumbnailSize';
    private static readonly keyPhotoListShowPhotoList = 'photoListShowPhotoList';
    private static readonly keyPhotoListSlideshowDisplayDurationSeconds = 'photoListSlideshowDisplayDurationSeconds';
    private static readonly keyPhotoListMapViewMapTypeId = 'photoListMapViewMapTypeId';
    private static readonly keyPhotoListMapViewZoom = 'photoListMapViewZoom';

    private static readonly keyPhotoInfoPanelShowRatings = 'photoInfoPanelShowRatings';
    private static readonly keyPhotoInfoPanelShowCategoryTeaserChooser = 'photoInfoPanelShowCategoryTeaserChooser';
    private static readonly keyPhotoInfoPanelShowComments = 'photoInfoPanelShowComments';
    private static readonly keyPhotoInfoPanelShowExif = 'photoInfoPanelShowExif';
    private static readonly keyPhotoInfoPanelShowEffects = 'photoInfoPanelShowEffects';
    private static readonly keyPhotoInfoPanelShowHistogram = 'photoInfoPanelShowHistogram';
    private static readonly keyPhotoInfoPanelShowMetadataEditor = 'photoInfoPanelShowMetadataEditor';
    private static readonly keyPhotoInfoPanelShowMinimap = 'photoInfoPanelShowMinimap';
    private static readonly keyPhotoInfoPanelExpandedState = 'photoInfoPanelExpandedState';
    private static readonly keyPhotoInfoPanelMinimapMapTypeId = 'photoInfoPanelMinimapMapTypeId';
    private static readonly keyPhotoInfoPanelMinimapZoom = 'photoInfoPanelMinimapZoom';

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
    private static readonly keyVideoInfoPanelMinimapMapTypeId = 'videoInfoPanelMinimapMapTypeId';
    private static readonly keyVideoInfoPanelMinimapZoom = 'videoInfoPanelMinimapZoom';

    private static readonly keySearchCategoryMargin = 'searchCategoryMargin';
    private static readonly keySearchThumbnailSize = 'searchThumbnailSize';
    private static readonly keySearchShowCategoryTitles = 'searchShowCategoryTitles';
    private static readonly keySearchShowCategoryYears = 'searchShowCategoryYears';
    private static readonly keySearchListType = 'searchListType';
    private static readonly keySearchListViewThumbnailSize = 'searchListViewThumbnailSize';

    private static readonly removedKeyCategoryListYearFilter = 'categoryListYearFilterEnabled';
    private static readonly removedKeyCategoryListToolbarExpandedState = 'categoryListToolbarExpandedState';
    private static readonly removedKeyPhotoListToolbarExpandedState = 'photoListToolbarExpandedState';
    private static readonly removedKeyPhotoListFullscreenToolbarExpandedState = 'photoListFullscreenToolbarExpandedState';
    private static readonly removedKeyVideoListToolbarExpandedState = 'videoListToolbarExpandedState';

    constructor(
        private localStorage: LocalStorageService
    ) {

    }

    // tslint:disable: max-line-length
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
                categoryListListType:              this.getCategoryListType(SettingsService.keyCategoryListListType),
                categoryListListViewThumbnailSize: this.getCategoryThumbnailSize(SettingsService.keyCategoryListListViewThumbnailSize),

                photoListThumbnailSize:                   this.getPhotoListThumbnailSize(),
                photoListSlideshowDisplayDurationSeconds: this.getPhotoListSlideshowDisplayDurationSeconds(),
                photoListShowCategoryBreadcrumbs:         this.getBoolean(SettingsService.keyPhotoListShowCategoryBreadcrumbs),
                photoListShowPhotoList:                   this.getBoolean(SettingsService.keyPhotoListShowPhotoList),
                photoListMapViewMapTypeId:                this.getValue(SettingsService.keyPhotoListMapViewMapTypeId),
                photoListMapViewZoom:                     this.getNumber(SettingsService.keyPhotoListMapViewZoom) ?? DEFAULT_SETTINGS.photoListMapViewZoom,

                photoInfoPanelShowRatings:               this.getBoolean(SettingsService.keyPhotoInfoPanelShowRatings),
                photoInfoPanelShowCategoryTeaserChooser: this.getBoolean(SettingsService.keyPhotoInfoPanelShowCategoryTeaserChooser),
                photoInfoPanelShowComments:              this.getBoolean(SettingsService.keyPhotoInfoPanelShowComments),
                photoInfoPanelShowExif:                  this.getBoolean(SettingsService.keyPhotoInfoPanelShowExif),
                photoInfoPanelShowEffects:               this.getBoolean(SettingsService.keyPhotoInfoPanelShowEffects),
                photoInfoPanelShowHistogram:             this.getBoolean(SettingsService.keyPhotoInfoPanelShowHistogram),
                photoInfoPanelShowMetadataEditor:        this.getBoolean(SettingsService.keyPhotoInfoPanelShowMetadataEditor),
                photoInfoPanelShowMinimap:               this.getBoolean(SettingsService.keyPhotoInfoPanelShowMinimap),
                photoInfoPanelExpandedState:             this.getBoolean(SettingsService.keyPhotoInfoPanelExpandedState),
                photoInfoPanelMinimapMapTypeId:          this.getValue(SettingsService.keyPhotoInfoPanelMinimapMapTypeId),
                photoInfoPanelMinimapZoom:               this.getNumber(SettingsService.keyPhotoInfoPanelMinimapZoom) ?? DEFAULT_SETTINGS.photoInfoPanelMinimapZoom,

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
                videoInfoPanelMinimapMapTypeId:          this.getValue(SettingsService.keyVideoInfoPanelMinimapMapTypeId),
                videoInfoPanelMinimapZoom:               this.getNumber(SettingsService.keyVideoInfoPanelMinimapZoom) ?? DEFAULT_SETTINGS.videoInfoPanelMinimapZoom,

                searchCategoryMargin:        this.getCategoryMargin(SettingsService.keySearchCategoryMargin),
                searchThumbnailSize:         this.getCategoryThumbnailSize(SettingsService.keySearchThumbnailSize),
                searchShowCategoryTitles:    this.getBoolean(SettingsService.keySearchShowCategoryTitles),
                searchShowCategoryYears:     this.getBoolean(SettingsService.keySearchShowCategoryYears),
                searchListType:              this.getCategoryListType(SettingsService.keySearchListType),
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

        this.setValue(SettingsService.keyCategoryListCategoryFilter, settings.categoryListCategoryFilter.name);
        this.setValue(SettingsService.keyCategoryListCategoryMargin, settings.categoryListCategoryMargin.name);
        this.setBoolean(SettingsService.keyCategoryListMissingGpsFilter, settings.categoryListMissingGpsFilter);
        this.setBoolean(SettingsService.keyCategoryListShowCategoryTitles, settings.categoryListShowCategoryTitles);
        this.setValue(SettingsService.keyCategoryListThumbnailSize, settings.categoryListThumbnailSize.name);
        this.setValue(SettingsService.keyCategoryListYearFilter, settings.categoryListYearFilter.toString());
        this.setValue(SettingsService.keyCategoryListListType, settings.categoryListListType.name);
        this.setValue(SettingsService.keyCategoryListListViewThumbnailSize, settings.categoryListListViewThumbnailSize.name);

        this.setBoolean(SettingsService.keyPhotoListShowCategoryBreadcrumbs, settings.photoListShowCategoryBreadcrumbs);
        this.setValue(SettingsService.keyPhotoListThumbnailSize, settings.photoListThumbnailSize.name);
        this.setBoolean(SettingsService.keyPhotoListShowPhotoList, settings.photoListShowPhotoList);
        this.setNumber(SettingsService.keyPhotoListSlideshowDisplayDurationSeconds, settings.photoListSlideshowDisplayDurationSeconds);
        this.setValue(SettingsService.keyPhotoListMapViewMapTypeId, settings.photoListMapViewMapTypeId);
        this.setNumber(SettingsService.keyPhotoListMapViewZoom, settings.photoListMapViewZoom);

        this.setBoolean(SettingsService.keyPhotoInfoPanelShowCategoryTeaserChooser, settings.photoInfoPanelShowCategoryTeaserChooser);
        this.setBoolean(SettingsService.keyPhotoInfoPanelShowComments, settings.photoInfoPanelShowComments);
        this.setBoolean(SettingsService.keyPhotoInfoPanelShowEffects, settings.photoInfoPanelShowEffects);
        this.setBoolean(SettingsService.keyPhotoInfoPanelShowExif, settings.photoInfoPanelShowExif);
        this.setBoolean(SettingsService.keyPhotoInfoPanelShowHistogram, settings.photoInfoPanelShowHistogram);
        this.setBoolean(SettingsService.keyPhotoInfoPanelShowRatings, settings.photoInfoPanelShowRatings);
        this.setBoolean(SettingsService.keyPhotoInfoPanelShowMetadataEditor, settings.photoInfoPanelShowMetadataEditor);
        this.setBoolean(SettingsService.keyPhotoInfoPanelShowMinimap, settings.photoInfoPanelShowMinimap);
        this.setBoolean(SettingsService.keyPhotoInfoPanelExpandedState, settings.photoInfoPanelExpandedState);
        this.setValue(SettingsService.keyPhotoInfoPanelMinimapMapTypeId, settings.photoInfoPanelMinimapMapTypeId);
        this.setNumber(SettingsService.keyPhotoInfoPanelMinimapZoom, settings.photoInfoPanelMinimapZoom);

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
        this.setValue(SettingsService.keyVideoInfoPanelMinimapMapTypeId, settings.videoInfoPanelMinimapMapTypeId);
        this.setNumber(SettingsService.keyVideoInfoPanelMinimapZoom, settings.videoInfoPanelMinimapZoom);

        this.setValue(SettingsService.keySearchCategoryMargin, settings.searchCategoryMargin.name);
        this.setBoolean(SettingsService.keySearchShowCategoryTitles, settings.searchShowCategoryTitles);
        this.setBoolean(SettingsService.keySearchShowCategoryYears, settings.searchShowCategoryYears);
        this.setValue(SettingsService.keySearchThumbnailSize, settings.searchThumbnailSize.name);
        this.setValue(SettingsService.keySearchListType, settings.searchListType.name);
        this.setValue(SettingsService.keySearchListViewThumbnailSize, settings.searchListViewThumbnailSize.name);

        this.killRemovedSettings();
    }

    killRemovedSettings(): void {
        this.clearValue(SettingsService.removedKeyCategoryListYearFilter);
        this.clearValue(SettingsService.removedKeyCategoryListToolbarExpandedState);
        this.clearValue(SettingsService.removedKeyPhotoListToolbarExpandedState);
        this.clearValue(SettingsService.removedKeyPhotoListFullscreenToolbarExpandedState);
        this.clearValue(SettingsService.removedKeyVideoListToolbarExpandedState);
    }

    clearAuthRedirectUrl(): void {
        this.clearValue(SettingsService.keyAuthRedirectUrl);
    }

    setAuthRedirectUrl(url: string): void {
        this.setValue(SettingsService.keyAuthRedirectUrl, url);
    }

    getAuthRedirectUrl(): string {
        return this.getValue(SettingsService.keyAuthRedirectUrl);
    }

    private getTheme(): Theme {
        const themeName = this.getValue(SettingsService.keyAppTheme);

        try {
            return themeName !== null ? Theme.forName(themeName) : Theme.themeDark;
        } catch {
            return Theme.themeDark;
        }
    }

    private getCategoryListType(key: string): CategoryListType {
        const name = this.getValue(key);

        try {
            return name !== null ? CategoryListType.forName(name) : CategoryListType.grid;
        } catch {
            return CategoryListType.grid;
        }
    }

    private getCategoryListCategoryFilter(): CategoryFilter {
        const name = this.getValue(SettingsService.keyCategoryListCategoryFilter);

        try {
            return name !== null ? CategoryFilter.forName(name) : CategoryFilter.all;
        } catch {
            return CategoryFilter.all;
        }
    }

    private getCategoryMargin(key: string): CategoryMargin {
        const name = this.getValue(key);

        try {
            return name !== null ? CategoryMargin.forName(name) : CategoryMargin.compact;
        } catch {
            return CategoryMargin.compact;
        }
    }

    private getCategoryThumbnailSize(key: string): ThumbnailSize {
        const sizeName = this.getValue(key);

        return this.getThumbnailSize(sizeName);
    }

    private getPhotoListThumbnailSize(): ThumbnailSize {
        const sizeName = this.getValue(SettingsService.keyPhotoListThumbnailSize);

        return this.getThumbnailSize(sizeName);
    }

    private getVideoListThumbnailSize(): ThumbnailSize {
        const sizeName = this.getValue(SettingsService.keyVideoListThumbnailSize);

        return this.getThumbnailSize(sizeName);
    }

    private getVideoListVideoSize(): VideoSize {
        const sizeName = this.getValue(SettingsService.keyVideoListVideoSize);

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
        const value = this.getValue(key).toLowerCase();

        return /^\d+$/.test(value) ? parseInt(value, 10) : value;
    }

    private getNumber(key: string): number | null {
        const value = this.getValue(key);

        return /^\d+$/.test(value) ? parseInt(value, 10) : null;
    }

    private getBoolean(key: string): boolean {
        const value = this.getValue(key);

        return /^true$/i.test(value);
    }

    private getValue(key: string): string {
        const val = this.localStorage.retrieve(key) as string;

        return val.replace('\'', '').replace('"', '');
    }

    private setValue(key: string, value: string): void {
        this.localStorage.store(key, value);
    }

    private setBoolean(key: string, value: boolean): void {
        this.localStorage.store(key, value.toString());
    }

    private setNumber(key: string, value: number): void {
        this.localStorage.store(key, value.toString());
    }

    private clearValue(key: string): void {
        this.localStorage.clear(key);
    }
}
