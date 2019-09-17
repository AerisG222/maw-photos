import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';

import { Settings } from 'src/app/core/models/settings.model';
import { Theme } from 'src/app/core/models/theme.model';
import { ThumbnailSize } from 'src/app/core/models/thumbnail-size.model';
import { VideoSize } from '../models/video-size.model';
import { CategoryMargin } from '../models/category-margin.model';
import { CategoryFilter } from '../models/category-filter.model';
import { CategoryListType } from '../models/category-list-type.model';

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
    private static readonly keyCategoryListToolbarExpandedState = 'categoryListToolbarExpandedState';
    private static readonly keyCategoryListYearFilter = 'categoryListYearFilter';
    private static readonly keyCategoryListListType = 'categoryListListType';
    private static readonly keyCategoryListListViewThumbnailSize = 'categoryListListViewThumbnailSize';

    private static readonly keyPhotoListShowCategoryBreadcrumbs = 'photoListShowCategoryBreadcrumbs';
    private static readonly keyPhotoListThumbnailSize = 'photoListThumbnailSize';
    private static readonly keyPhotoListShowPhotoList = 'photoListShowPhotoList';
    private static readonly keyPhotoListSlideshowDisplayDurationSeconds = 'photoListSlideshowDisplayDurationSeconds';
    private static readonly keyPhotoListToolbarExpandedState = 'photoListToolbarExpandedState';
    private static readonly keyPhotoListFullscreenToolbarExpandedState = 'photoListFullscreenToolbarExpandedState';
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
    private static readonly keyVideoListToolbarExpandedState = 'videoListToolbarExpandedState';
    private static readonly keyVideoListVideoSize = 'videoListVideoSize';

    private static readonly keyVideoInfoPanelShowRatings = 'videoInfoPanelShowRatings';
    private static readonly keyVideoInfoPanelShowComments = 'videoInfoPanelShowComments';
    private static readonly keyVideoInfoPanelShowMinimap = 'videoInfoPanelShowMinimap';
    private static readonly keyVideoInfoPanelExpandedState = 'videoInfoPanelExpandedState';
    private static readonly keyVideoInfoPanelMinimapMapTypeId = 'videoInfoPanelMinimapMapTypeId';
    private static readonly keyVideoInfoPanelMinimapZoom = 'videoInfoPanelMinimapZoom';

    private static readonly removedKeyCategoryListYearFilter = 'categoryListYearFilterEnabled';

    constructor(
        private localStorage: LocalStorageService
    ) {

    }

    load(): Settings {
        const categoryListShowCategoryTitles = this.localStorage.retrieve(SettingsService.keyCategoryListShowCategoryTitles);
        const categoryListToolbarExpandedState = this.localStorage.retrieve(SettingsService.keyCategoryListToolbarExpandedState);
        const categoryListYearFilter = this.localStorage.retrieve(SettingsService.keyCategoryListYearFilter) as string | number;

        const photoListShowCategoryBreadcrumbs = this.localStorage.retrieve(SettingsService.keyPhotoListShowCategoryBreadcrumbs);
        const photoListShowPhotoList = this.localStorage.retrieve(SettingsService.keyPhotoListShowPhotoList);
        const photoListToolbarExpandedState = this.localStorage.retrieve(SettingsService.keyPhotoListToolbarExpandedState);
        // tslint:disable-next-line:max-line-length
        const photoListFullscreenToolbarExpandedState = this.localStorage.retrieve(SettingsService.keyPhotoListFullscreenToolbarExpandedState);
        const photoListMapViewMapTypeId = this.localStorage.retrieve(SettingsService.keyPhotoListMapViewMapTypeId);
        const photoListMapViewZoom = this.localStorage.retrieve(SettingsService.keyPhotoListMapViewZoom);

        const photoInfoPanelShowRatings = this.localStorage.retrieve(SettingsService.keyPhotoInfoPanelShowRatings);
        const photoInfoPanelShowComments = this.localStorage.retrieve(SettingsService.keyPhotoInfoPanelShowComments);
        const photoInfoPanelShowExif = this.localStorage.retrieve(SettingsService.keyPhotoInfoPanelShowExif);
        const photoInfoPanelShowEffects = this.localStorage.retrieve(SettingsService.keyPhotoInfoPanelShowEffects);
        const photoInfoPanelShowHistogram = this.localStorage.retrieve(SettingsService.keyPhotoInfoPanelShowHistogram);
        const photoInfoPanelShowMinimap = this.localStorage.retrieve(SettingsService.keyPhotoInfoPanelShowMinimap);
        const photoInfoPanelExpandedState = this.localStorage.retrieve(SettingsService.keyPhotoInfoPanelExpandedState);
        const photoInfoPanelMinimapMapTypeId = this.localStorage.retrieve(SettingsService.keyPhotoInfoPanelMinimapMapTypeId);
        const photoInfoPanelMinimapZoom = this.localStorage.retrieve(SettingsService.keyPhotoInfoPanelMinimapZoom);

        const videoListShowCategoryBreadcrumbs = this.localStorage.retrieve(SettingsService.keyVideoListShowCategoryBreadcrumbs);
        const videoListShowVideoList = this.localStorage.retrieve(SettingsService.keyVideoListShowVideoList);
        const videoListToolbarExpandedState = this.localStorage.retrieve(SettingsService.keyVideoListToolbarExpandedState);

        const videoInfoPanelShowRatings = this.localStorage.retrieve(SettingsService.keyVideoInfoPanelShowRatings);
        const videoInfoPanelShowComments = this.localStorage.retrieve(SettingsService.keyVideoInfoPanelShowComments);
        const videoInfoPanelShowMinimap = this.localStorage.retrieve(SettingsService.keyVideoInfoPanelShowMinimap);
        const videoInfoPanelExpandedState = this.localStorage.retrieve(SettingsService.keyVideoInfoPanelExpandedState);
        const videoInfoPanelMinimapMapTypeId = this.localStorage.retrieve(SettingsService.keyVideoInfoPanelMinimapMapTypeId);
        const videoInfoPanelMinimapZoom = this.localStorage.retrieve(SettingsService.keyVideoInfoPanelMinimapZoom);

        return {
            appTheme: this.getTheme(),

            categoryListCategoryFilter: this.getCategoryListCategoryFilter(),
            categoryListCategoryMargin: this.getCategoryListCategoryMargin(),
            categoryListThumbnailSize: this.getCategoryThumbnailSize(),
            categoryListShowCategoryTitles: categoryListShowCategoryTitles !== null ? categoryListShowCategoryTitles : true,
            categoryListToolbarExpandedState: categoryListToolbarExpandedState !== null ? categoryListToolbarExpandedState : true,
            categoryListYearFilter: categoryListYearFilter !== null ? categoryListYearFilter : 'all',
            categoryListListType: this.getCategoryListListType(),
            categoryListListViewThumbnailSize: this.getCategoryListListViewThumbnailSize(),

            photoListThumbnailSize: this.getPhotoListThumbnailSize(),
            photoListSlideshowDisplayDurationSeconds: this.getPhotoListSlideshowDisplayDurationSeconds(),
            photoListShowCategoryBreadcrumbs: photoListShowCategoryBreadcrumbs !== null ? photoListShowCategoryBreadcrumbs : true,
            photoListShowPhotoList: photoListShowPhotoList !== null ? photoListShowPhotoList : true,
            photoListToolbarExpandedState: photoListToolbarExpandedState !== null ? photoListToolbarExpandedState : true,
            // tslint:disable-next-line:max-line-length
            photoListFullscreenToolbarExpandedState: photoListFullscreenToolbarExpandedState !== null ? photoListFullscreenToolbarExpandedState : true,
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
            videoListToolbarExpandedState: videoListToolbarExpandedState != null ? videoListToolbarExpandedState : true,
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

        this.localStorage.store(SettingsService.keyAppTheme, settings.appTheme.name);

        this.localStorage.store(SettingsService.keyCategoryListCategoryFilter, settings.categoryListCategoryFilter.name);
        this.localStorage.store(SettingsService.keyCategoryListCategoryMargin, settings.categoryListCategoryMargin.name);
        this.localStorage.store(SettingsService.keyCategoryListShowCategoryTitles, settings.categoryListShowCategoryTitles);
        this.localStorage.store(SettingsService.keyCategoryListThumbnailSize, settings.categoryListThumbnailSize.name);
        this.localStorage.store(SettingsService.keyCategoryListToolbarExpandedState, settings.categoryListToolbarExpandedState);
        this.localStorage.store(SettingsService.keyCategoryListYearFilter, settings.categoryListYearFilter);
        this.localStorage.store(SettingsService.keyCategoryListListType, settings.categoryListListType.name);
        this.localStorage.store(SettingsService.keyCategoryListListViewThumbnailSize, settings.categoryListListViewThumbnailSize.name);

        this.localStorage.store(SettingsService.keyPhotoListShowCategoryBreadcrumbs, settings.photoListShowCategoryBreadcrumbs);
        this.localStorage.store(SettingsService.keyPhotoListThumbnailSize, settings.photoListThumbnailSize.name);
        this.localStorage.store(SettingsService.keyPhotoListShowPhotoList, settings.photoListShowPhotoList);
        // tslint:disable-next-line:max-line-length
        this.localStorage.store(SettingsService.keyPhotoListSlideshowDisplayDurationSeconds, settings.photoListSlideshowDisplayDurationSeconds);
        this.localStorage.store(SettingsService.keyPhotoListToolbarExpandedState, settings.photoListToolbarExpandedState);
        // tslint:disable-next-line:max-line-length
        this.localStorage.store(SettingsService.keyPhotoListFullscreenToolbarExpandedState, settings.photoListFullscreenToolbarExpandedState);
        this.localStorage.store(SettingsService.keyPhotoListMapViewMapTypeId, settings.photoListMapViewMapTypeId);
        this.localStorage.store(SettingsService.keyPhotoListMapViewZoom, settings.photoListMapViewZoom);

        this.localStorage.store(SettingsService.keyPhotoInfoPanelShowComments, settings.photoInfoPanelShowComments);
        this.localStorage.store(SettingsService.keyPhotoInfoPanelShowEffects, settings.photoInfoPanelShowEffects);
        this.localStorage.store(SettingsService.keyPhotoInfoPanelShowExif, settings.photoInfoPanelShowExif);
        this.localStorage.store(SettingsService.keyPhotoInfoPanelShowHistogram, settings.photoInfoPanelShowHistogram);
        this.localStorage.store(SettingsService.keyPhotoInfoPanelShowRatings, settings.photoInfoPanelShowRatings);
        this.localStorage.store(SettingsService.keyPhotoInfoPanelShowMinimap, settings.photoInfoPanelShowMinimap);
        this.localStorage.store(SettingsService.keyPhotoInfoPanelExpandedState, settings.photoInfoPanelExpandedState);
        this.localStorage.store(SettingsService.keyPhotoInfoPanelMinimapMapTypeId, settings.photoInfoPanelMinimapMapTypeId);
        this.localStorage.store(SettingsService.keyPhotoInfoPanelMinimapZoom, settings.photoInfoPanelMinimapZoom);

        this.localStorage.store(SettingsService.keyVideoListShowCategoryBreadcrumbs, settings.videoListShowCategoryBreadcrumbs);
        this.localStorage.store(SettingsService.keyVideoListShowVideoList, settings.videoListShowVideoList);
        this.localStorage.store(SettingsService.keyVideoListThumbnailSize, settings.videoListThumbnailSize.name);
        this.localStorage.store(SettingsService.keyVideoListToolbarExpandedState, settings.videoListToolbarExpandedState);
        this.localStorage.store(SettingsService.keyVideoListVideoSize, settings.videoListVideoSize.name);

        this.localStorage.store(SettingsService.keyVideoInfoPanelExpandedState, settings.videoInfoPanelExpandedState);
        this.localStorage.store(SettingsService.keyVideoInfoPanelShowComments, settings.videoInfoPanelShowComments);
        this.localStorage.store(SettingsService.keyVideoInfoPanelShowMinimap, settings.videoInfoPanelShowMinimap);
        this.localStorage.store(SettingsService.keyVideoInfoPanelShowRatings, settings.videoInfoPanelShowRatings);
        this.localStorage.store(SettingsService.keyVideoInfoPanelMinimapMapTypeId, settings.videoInfoPanelMinimapMapTypeId);
        this.localStorage.store(SettingsService.keyVideoInfoPanelMinimapZoom, settings.videoInfoPanelMinimapZoom);

        this.killRemovedSettings();
    }

    killRemovedSettings(): void {
        this.localStorage.clear(SettingsService.removedKeyCategoryListYearFilter);
    }

    clearAuthRedirectUrl(): void {
        this.localStorage.clear(SettingsService.keyAuthRedirectUrl);
    }

    setAuthRedirectUrl(url: string): void {
        this.localStorage.store(SettingsService.keyAuthRedirectUrl, url);
    }

    getAuthRedirectUrl(): string {
        return this.localStorage.retrieve(SettingsService.keyAuthRedirectUrl) as string;
    }

    private getTheme(): Theme {
        const themeName = this.localStorage.retrieve(SettingsService.keyAppTheme);

        try {
            return themeName !== null ? Theme.forName(themeName) : Theme.themeDark;
        } catch {
            return Theme.themeDark;
        }
    }

    private getCategoryListListType(): CategoryListType {
        const name = this.localStorage.retrieve(SettingsService.keyCategoryListListType);

        try {
            return name !== null ? CategoryListType.forName(name) : CategoryListType.grid;
        } catch {
            return CategoryListType.grid;
        }
    }

    private getCategoryListListViewThumbnailSize(): ThumbnailSize {
        const sizeName = this.localStorage.retrieve(SettingsService.keyCategoryListListViewThumbnailSize);

        return this.getThumbnailSize(sizeName);
    }

    private getCategoryListCategoryFilter(): CategoryFilter {
        const name = this.localStorage.retrieve(SettingsService.keyCategoryListCategoryFilter);

        try {
            return name !== null ? CategoryFilter.forName(name) : CategoryFilter.all;
        } catch {
            return CategoryFilter.all;
        }
    }

    private getCategoryListCategoryMargin(): CategoryMargin {
        const name = this.localStorage.retrieve(SettingsService.keyCategoryListCategoryMargin);

        try {
            return name !== null ? CategoryMargin.forName(name) : CategoryMargin.compact;
        } catch {
            return CategoryMargin.compact;
        }
    }

    private getCategoryThumbnailSize(): ThumbnailSize {
        const sizeName = this.localStorage.retrieve(SettingsService.keyCategoryListThumbnailSize);

        return this.getThumbnailSize(sizeName);
    }

    private getPhotoListThumbnailSize(): ThumbnailSize {
        const sizeName = this.localStorage.retrieve(SettingsService.keyPhotoListThumbnailSize);

        return this.getThumbnailSize(sizeName);
    }

    private getVideoListThumbnailSize(): ThumbnailSize {
        const sizeName = this.localStorage.retrieve(SettingsService.keyVideoListThumbnailSize);

        return this.getThumbnailSize(sizeName);
    }

    private getVideoListVideoSize(): VideoSize {
        const sizeName = this.localStorage.retrieve(SettingsService.keyVideoListVideoSize);

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
        const secs = this.localStorage.retrieve(SettingsService.keyPhotoListSlideshowDisplayDurationSeconds);

        try {
            const numSecs = Number(secs);

            if (numSecs <= 0) {
                return def;
            }

            return numSecs;
        } catch {
            return def;
        }
    }
}
