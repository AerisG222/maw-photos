import { Injectable } from '@angular/core';

import { Settings } from 'src/app/core/models/settings.model';
import { Theme } from 'src/app/core/models/theme.model';
import { ThumbnailSize } from 'src/app/core/models/thumbnail-size.model';
import { VideoSize } from '../models/video-size.model';
import { CategoryMargin } from '../models/category-margin.model';
import { CategoryFilter } from '../models/category-filter.model';
import { CategoryListType } from '../models/category-list-type.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {
    private static readonly keyAuthRedirectUrl = 'authRedirectUrl';

    private static readonly keyAppTheme = 'appTheme';

    private static readonly keyCategoryListCategoryFilter = 'categoryListCategoryFilter';
    private static readonly keyCategoryListCategoryMargin = 'categoryListCategoryMargin';
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
    private static readonly keyPhotoInfoPanelShowComments = 'photoInfoPanelShowComments';
    private static readonly keyPhotoInfoPanelShowExif = 'photoInfoPanelShowExif';
    private static readonly keyPhotoInfoPanelShowEffects = 'photoInfoPanelShowEffects';
    private static readonly keyPhotoInfoPanelShowHistogram = 'photoInfoPanelShowHistogram';
    private static readonly keyPhotoInfoPanelShowMinimap = 'photoInfoPanelShowMinimap';
    private static readonly keyPhotoInfoPanelExpandedState = 'photoInfoPanelExpandedState';
    private static readonly keyPhotoInfoPanelMinimapMapTypeId = 'photoInfoPanelMinimapMapTypeId';
    private static readonly keyPhotoInfoPanelMinimapZoom = 'photoInfoPanelMinimapZoom';

    private static readonly keyVideoListShowCategoryBreadcrumbs = 'videoListShowCategoryBreadcrumbs';
    private static readonly keyVideoListThumbnailSize = 'videoListThumbnailSize';
    private static readonly keyVideoListShowVideoList = 'videoListShowVideoList';
    private static readonly keyVideoListVideoSize = 'videoListVideoSize';

    private static readonly keyVideoInfoPanelShowRatings = 'videoInfoPanelShowRatings';
    private static readonly keyVideoInfoPanelShowComments = 'videoInfoPanelShowComments';
    private static readonly keyVideoInfoPanelShowMinimap = 'videoInfoPanelShowMinimap';
    private static readonly keyVideoInfoPanelExpandedState = 'videoInfoPanelExpandedState';
    private static readonly keyVideoInfoPanelMinimapMapTypeId = 'videoInfoPanelMinimapMapTypeId';
    private static readonly keyVideoInfoPanelMinimapZoom = 'videoInfoPanelMinimapZoom';

    private static readonly removedKeyCategoryListYearFilter = 'categoryListYearFilterEnabled';
    private static readonly removedKeyCategoryListToolbarExpandedState = 'categoryListToolbarExpandedState';
    private static readonly removedKeyPhotoListToolbarExpandedState = 'photoListToolbarExpandedState';
    private static readonly removedKeyPhotoListFullscreenToolbarExpandedState = 'photoListFullscreenToolbarExpandedState';
    private static readonly removedKeyVideoListToolbarExpandedState = 'videoListToolbarExpandedState';

    constructor(
        private localStorage: LocalStorageService
    ) {

    }

    load(): Settings {
        const categoryListShowCategoryTitles = this.getBoolean(SettingsService.keyCategoryListShowCategoryTitles);
        const categoryListYearFilter = this.getStringOrNumber(SettingsService.keyCategoryListYearFilter);

        const photoListShowCategoryBreadcrumbs = this.getBoolean(SettingsService.keyPhotoListShowCategoryBreadcrumbs);
        const photoListShowPhotoList = this.getBoolean(SettingsService.keyPhotoListShowPhotoList);
        const photoListMapViewMapTypeId = this.getValue(SettingsService.keyPhotoListMapViewMapTypeId);
        const photoListMapViewZoom = this.getNumber(this.localStorage.retrieve(SettingsService.keyPhotoListMapViewZoom));

        const photoInfoPanelShowRatings = this.getBoolean(SettingsService.keyPhotoInfoPanelShowRatings);
        const photoInfoPanelShowComments = this.getBoolean(SettingsService.keyPhotoInfoPanelShowComments);
        const photoInfoPanelShowExif = this.getBoolean(SettingsService.keyPhotoInfoPanelShowExif);
        const photoInfoPanelShowEffects = this.getBoolean(SettingsService.keyPhotoInfoPanelShowEffects);
        const photoInfoPanelShowHistogram = this.getBoolean(SettingsService.keyPhotoInfoPanelShowHistogram);
        const photoInfoPanelShowMinimap = this.getBoolean(SettingsService.keyPhotoInfoPanelShowMinimap);
        const photoInfoPanelExpandedState = this.getBoolean(SettingsService.keyPhotoInfoPanelExpandedState);
        const photoInfoPanelMinimapMapTypeId = this.getValue(SettingsService.keyPhotoInfoPanelMinimapMapTypeId);
        const photoInfoPanelMinimapZoom = this.getNumber(SettingsService.keyPhotoInfoPanelMinimapZoom);

        const videoListShowCategoryBreadcrumbs = this.getBoolean(SettingsService.keyVideoListShowCategoryBreadcrumbs);
        const videoListShowVideoList = this.getBoolean(SettingsService.keyVideoListShowVideoList);

        const videoInfoPanelShowRatings = this.getBoolean(SettingsService.keyVideoInfoPanelShowRatings);
        const videoInfoPanelShowComments = this.getBoolean(SettingsService.keyVideoInfoPanelShowComments);
        const videoInfoPanelShowMinimap = this.getBoolean(SettingsService.keyVideoInfoPanelShowMinimap);
        const videoInfoPanelExpandedState = this.getBoolean(SettingsService.keyVideoInfoPanelExpandedState);
        const videoInfoPanelMinimapMapTypeId = this.getValue(SettingsService.keyVideoInfoPanelMinimapMapTypeId);
        const videoInfoPanelMinimapZoom = this.getNumber(SettingsService.keyVideoInfoPanelMinimapZoom);

        return {
            appTheme: this.getTheme(),

            categoryListCategoryFilter: this.getCategoryListCategoryFilter(),
            categoryListCategoryMargin: this.getCategoryListCategoryMargin(),
            categoryListThumbnailSize: this.getCategoryThumbnailSize(),
            categoryListShowCategoryTitles: categoryListShowCategoryTitles !== null ? categoryListShowCategoryTitles : true,
            categoryListYearFilter: categoryListYearFilter !== null ? categoryListYearFilter : 'all',
            categoryListListType: this.getCategoryListListType(),
            categoryListListViewThumbnailSize: this.getCategoryListListViewThumbnailSize(),

            photoListThumbnailSize: this.getPhotoListThumbnailSize(),
            photoListSlideshowDisplayDurationSeconds: this.getPhotoListSlideshowDisplayDurationSeconds(),
            photoListShowCategoryBreadcrumbs: photoListShowCategoryBreadcrumbs !== null ? photoListShowCategoryBreadcrumbs : true,
            photoListShowPhotoList: photoListShowPhotoList !== null ? photoListShowPhotoList : true,
            photoListMapViewMapTypeId: photoListMapViewMapTypeId != null ? photoListMapViewMapTypeId : 'roadmap',
            photoListMapViewZoom: photoListMapViewZoom != null ? photoListMapViewZoom : 10,

            photoInfoPanelShowRatings: photoInfoPanelShowRatings !== null ? photoInfoPanelShowRatings : true,
            photoInfoPanelShowComments: photoInfoPanelShowComments !== null ? photoInfoPanelShowComments : true,
            photoInfoPanelShowExif: photoInfoPanelShowExif !== null ? photoInfoPanelShowExif : false,
            photoInfoPanelShowEffects: photoInfoPanelShowEffects !== null ? photoInfoPanelShowEffects : false,
            photoInfoPanelShowHistogram: photoInfoPanelShowHistogram !== null ? photoInfoPanelShowHistogram : false,
            photoInfoPanelShowMinimap: photoInfoPanelShowMinimap !== null ? photoInfoPanelShowMinimap : false,
            photoInfoPanelExpandedState: photoInfoPanelExpandedState !== null ? photoInfoPanelExpandedState : false,
            photoInfoPanelMinimapMapTypeId: photoInfoPanelMinimapMapTypeId != null ? photoInfoPanelMinimapMapTypeId : 'roadmap',
            photoInfoPanelMinimapZoom: photoInfoPanelMinimapZoom !== null ? photoInfoPanelMinimapZoom : 10,

            videoListShowCategoryBreadcrumbs: videoListShowCategoryBreadcrumbs !== null ? videoListShowCategoryBreadcrumbs : true,
            videoListThumbnailSize: this.getVideoListThumbnailSize(),
            videoListShowVideoList: videoListShowVideoList !== null ? videoListShowVideoList : true,
            videoListVideoSize: this.getVideoListVideoSize(),

            videoInfoPanelShowRatings: videoInfoPanelShowRatings !== null ? videoInfoPanelShowRatings : true,
            videoInfoPanelShowComments: videoInfoPanelShowComments !== null ? videoInfoPanelShowComments : true,
            videoInfoPanelShowMinimap: videoInfoPanelShowMinimap !== null ? videoInfoPanelShowMinimap : false,
            videoInfoPanelExpandedState: videoInfoPanelExpandedState !== null ? videoInfoPanelExpandedState : false,
            videoInfoPanelMinimapMapTypeId: videoInfoPanelMinimapMapTypeId !== null ? videoInfoPanelMinimapMapTypeId : 'roadmap',
            videoInfoPanelMinimapZoom: videoInfoPanelMinimapZoom !== null ? videoInfoPanelMinimapZoom : 10
        };
    }

    save(settings: Settings) {
        if (!settings) {
            return;
        }

        this.setValue(SettingsService.keyAppTheme, settings.appTheme.name);

        this.setValue(SettingsService.keyCategoryListCategoryFilter, settings.categoryListCategoryFilter.name);
        this.setValue(SettingsService.keyCategoryListCategoryMargin, settings.categoryListCategoryMargin.name);
        this.setValue(SettingsService.keyCategoryListShowCategoryTitles, settings.categoryListShowCategoryTitles);
        this.setValue(SettingsService.keyCategoryListThumbnailSize, settings.categoryListThumbnailSize.name);
        this.setValue(SettingsService.keyCategoryListYearFilter, settings.categoryListYearFilter);
        this.setValue(SettingsService.keyCategoryListListType, settings.categoryListListType.name);
        this.setValue(SettingsService.keyCategoryListListViewThumbnailSize, settings.categoryListListViewThumbnailSize.name);

        this.setValue(SettingsService.keyPhotoListShowCategoryBreadcrumbs, settings.photoListShowCategoryBreadcrumbs);
        this.setValue(SettingsService.keyPhotoListThumbnailSize, settings.photoListThumbnailSize.name);
        this.setValue(SettingsService.keyPhotoListShowPhotoList, settings.photoListShowPhotoList);
        this.setValue(SettingsService.keyPhotoListSlideshowDisplayDurationSeconds, settings.photoListSlideshowDisplayDurationSeconds);
        this.setValue(SettingsService.keyPhotoListMapViewMapTypeId, settings.photoListMapViewMapTypeId);
        this.setValue(SettingsService.keyPhotoListMapViewZoom, settings.photoListMapViewZoom);

        this.setValue(SettingsService.keyPhotoInfoPanelShowComments, settings.photoInfoPanelShowComments);
        this.setValue(SettingsService.keyPhotoInfoPanelShowEffects, settings.photoInfoPanelShowEffects);
        this.setValue(SettingsService.keyPhotoInfoPanelShowExif, settings.photoInfoPanelShowExif);
        this.setValue(SettingsService.keyPhotoInfoPanelShowHistogram, settings.photoInfoPanelShowHistogram);
        this.setValue(SettingsService.keyPhotoInfoPanelShowRatings, settings.photoInfoPanelShowRatings);
        this.setValue(SettingsService.keyPhotoInfoPanelShowMinimap, settings.photoInfoPanelShowMinimap);
        this.setValue(SettingsService.keyPhotoInfoPanelExpandedState, settings.photoInfoPanelExpandedState);
        this.setValue(SettingsService.keyPhotoInfoPanelMinimapMapTypeId, settings.photoInfoPanelMinimapMapTypeId);
        this.setValue(SettingsService.keyPhotoInfoPanelMinimapZoom, settings.photoInfoPanelMinimapZoom);

        this.setValue(SettingsService.keyVideoListShowCategoryBreadcrumbs, settings.videoListShowCategoryBreadcrumbs);
        this.setValue(SettingsService.keyVideoListShowVideoList, settings.videoListShowVideoList);
        this.setValue(SettingsService.keyVideoListThumbnailSize, settings.videoListThumbnailSize.name);
        this.setValue(SettingsService.keyVideoListVideoSize, settings.videoListVideoSize.name);

        this.setValue(SettingsService.keyVideoInfoPanelExpandedState, settings.videoInfoPanelExpandedState);
        this.setValue(SettingsService.keyVideoInfoPanelShowComments, settings.videoInfoPanelShowComments);
        this.setValue(SettingsService.keyVideoInfoPanelShowMinimap, settings.videoInfoPanelShowMinimap);
        this.setValue(SettingsService.keyVideoInfoPanelShowRatings, settings.videoInfoPanelShowRatings);
        this.setValue(SettingsService.keyVideoInfoPanelMinimapMapTypeId, settings.videoInfoPanelMinimapMapTypeId);
        this.setValue(SettingsService.keyVideoInfoPanelMinimapZoom, settings.videoInfoPanelMinimapZoom);

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

    private getCategoryListListType(): CategoryListType {
        const name = this.getValue(SettingsService.keyCategoryListListType);

        try {
            return name !== null ? CategoryListType.forName(name) : CategoryListType.grid;
        } catch {
            return CategoryListType.grid;
        }
    }

    private getCategoryListListViewThumbnailSize(): ThumbnailSize {
        const sizeName = this.getValue(SettingsService.keyCategoryListListViewThumbnailSize);

        return this.getThumbnailSize(sizeName);
    }

    private getCategoryListCategoryFilter(): CategoryFilter {
        const name = this.getValue(SettingsService.keyCategoryListCategoryFilter);

        try {
            return name !== null ? CategoryFilter.forName(name) : CategoryFilter.all;
        } catch {
            return CategoryFilter.all;
        }
    }

    private getCategoryListCategoryMargin(): CategoryMargin {
        const name = this.getValue(SettingsService.keyCategoryListCategoryMargin);

        try {
            return name !== null ? CategoryMargin.forName(name) : CategoryMargin.compact;
        } catch {
            return CategoryMargin.compact;
        }
    }

    private getCategoryThumbnailSize(): ThumbnailSize {
        const sizeName = this.getValue(SettingsService.keyCategoryListThumbnailSize);

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
        const value = this.getValue(key);

        return /^\d+$/.test(value) ? parseInt(value, 10) : value;
    }

    private getNumber(key: string): number {
        const value = this.getValue(key);

        return /^\d+$/.test(value) ? parseInt(value, 10) : null;
    }

    private getBoolean(key: string): boolean {
        const value = this.getValue(key);

        return /^true$/i.test(value);
    }

    private getValue(key: string): string {
        return this.localStorage.retrieve(key) as string;
    }

    private setValue(key: string, value: any) {
        this.localStorage.store(key, value);
    }

    private clearValue(key: string) {
        this.localStorage.clear(key);
    }
}
