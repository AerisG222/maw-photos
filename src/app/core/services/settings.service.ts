import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';

import { Settings } from 'src/app/core/models/settings.model';
import { Theme } from 'src/app/core/models/theme.model';
import { ThumbnailSize } from 'src/app/core/models/thumbnail-size.model';
import { VideoSize } from '../models/video-size.model';
import { CategoryMargin } from '../models/category-margin.model';
import { CategoryFilter } from '../models/category-filter.model';

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

    constructor(
        private _localStorage: LocalStorageService
    ) {

    }

    load(): Settings {
        const categoryListShowCategoryTitles = this._localStorage.retrieve(SettingsService.keyCategoryListShowCategoryTitles);

        const photoListShowCategoryBreadcrumbs = this._localStorage.retrieve(SettingsService.keyPhotoListShowCategoryBreadcrumbs);
        const photoListShowPhotoList = this._localStorage.retrieve(SettingsService.keyPhotoListShowPhotoList);
        const photoListToolbarExpandedState = this._localStorage.retrieve(SettingsService.keyPhotoListToolbarExpandedState);
        // tslint:disable-next-line:max-line-length
        const photoListFullscreenToolbarExpandedState = this._localStorage.retrieve(SettingsService.keyPhotoListFullscreenToolbarExpandedState);
        const photoListMapViewMapTypeId = this._localStorage.retrieve(SettingsService.keyPhotoListMapViewMapTypeId);
        const photoListMapViewZoom = this._localStorage.retrieve(SettingsService.keyPhotoListMapViewZoom);

        const photoInfoPanelShowRatings = this._localStorage.retrieve(SettingsService.keyPhotoInfoPanelShowRatings);
        const photoInfoPanelShowComments = this._localStorage.retrieve(SettingsService.keyPhotoInfoPanelShowComments);
        const photoInfoPanelShowExif = this._localStorage.retrieve(SettingsService.keyPhotoInfoPanelShowExif);
        const photoInfoPanelShowEffects = this._localStorage.retrieve(SettingsService.keyPhotoInfoPanelShowEffects);
        const photoInfoPanelShowHistogram = this._localStorage.retrieve(SettingsService.keyPhotoInfoPanelShowHistogram);
        const photoInfoPanelShowMinimap = this._localStorage.retrieve(SettingsService.keyPhotoInfoPanelShowMinimap);
        const photoInfoPanelExpandedState = this._localStorage.retrieve(SettingsService.keyPhotoInfoPanelExpandedState);
        const photoInfoPanelMinimapMapTypeId = this._localStorage.retrieve(SettingsService.keyPhotoInfoPanelMinimapMapTypeId);
        const photoInfoPanelMinimapZoom = this._localStorage.retrieve(SettingsService.keyPhotoInfoPanelMinimapZoom);

        const videoListShowCategoryBreadcrumbs = this._localStorage.retrieve(SettingsService.keyVideoListShowCategoryBreadcrumbs);
        const videoListShowVideoList = this._localStorage.retrieve(SettingsService.keyVideoListShowVideoList);
        const videoListToolbarExpandedState = this._localStorage.retrieve(SettingsService.keyVideoListToolbarExpandedState);

        const videoInfoPanelShowRatings = this._localStorage.retrieve(SettingsService.keyVideoInfoPanelShowRatings);
        const videoInfoPanelShowComments = this._localStorage.retrieve(SettingsService.keyVideoInfoPanelShowComments);
        const videoInfoPanelShowMinimap = this._localStorage.retrieve(SettingsService.keyVideoInfoPanelShowMinimap);
        const videoInfoPanelExpandedState = this._localStorage.retrieve(SettingsService.keyVideoInfoPanelExpandedState);
        const videoInfoPanelMinimapMapTypeId = this._localStorage.retrieve(SettingsService.keyVideoInfoPanelMinimapMapTypeId);
        const videoInfoPanelMinimapZoom = this._localStorage.retrieve(SettingsService.keyVideoInfoPanelMinimapZoom);

        return {
            appTheme: this.getTheme(),

            categoryListCategoryFilter: this.getCategoryListCategoryFilter(),
            categoryListCategoryMargin: this.getCategoryListCategoryMargin(),
            categoryListThumbnailSize: this.getCategoryThumbnailSize(),
            categoryListShowCategoryTitles: categoryListShowCategoryTitles !== null ? categoryListShowCategoryTitles : true,

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

        this._localStorage.store(SettingsService.keyAppTheme, settings.appTheme.name);

        this._localStorage.store(SettingsService.keyCategoryListCategoryFilter, settings.categoryListCategoryFilter.name);
        this._localStorage.store(SettingsService.keyCategoryListCategoryMargin, settings.categoryListCategoryMargin.name);
        this._localStorage.store(SettingsService.keyCategoryListShowCategoryTitles, settings.categoryListShowCategoryTitles);
        this._localStorage.store(SettingsService.keyCategoryListThumbnailSize, settings.categoryListThumbnailSize.name);

        this._localStorage.store(SettingsService.keyPhotoListShowCategoryBreadcrumbs, settings.photoListShowCategoryBreadcrumbs);
        this._localStorage.store(SettingsService.keyPhotoListThumbnailSize, settings.photoListThumbnailSize.name);
        this._localStorage.store(SettingsService.keyPhotoListShowPhotoList, settings.photoListShowPhotoList);
        // tslint:disable-next-line:max-line-length
        this._localStorage.store(SettingsService.keyPhotoListSlideshowDisplayDurationSeconds, settings.photoListSlideshowDisplayDurationSeconds);
        this._localStorage.store(SettingsService.keyPhotoListToolbarExpandedState, settings.photoListToolbarExpandedState);
        // tslint:disable-next-line:max-line-length
        this._localStorage.store(SettingsService.keyPhotoListFullscreenToolbarExpandedState, settings.photoListFullscreenToolbarExpandedState);
        this._localStorage.store(SettingsService.keyPhotoListMapViewMapTypeId, settings.photoListMapViewMapTypeId);
        this._localStorage.store(SettingsService.keyPhotoListMapViewZoom, settings.photoListMapViewZoom);

        this._localStorage.store(SettingsService.keyPhotoInfoPanelShowComments, settings.photoInfoPanelShowComments);
        this._localStorage.store(SettingsService.keyPhotoInfoPanelShowEffects, settings.photoInfoPanelShowEffects);
        this._localStorage.store(SettingsService.keyPhotoInfoPanelShowExif, settings.photoInfoPanelShowExif);
        this._localStorage.store(SettingsService.keyPhotoInfoPanelShowHistogram, settings.photoInfoPanelShowHistogram);
        this._localStorage.store(SettingsService.keyPhotoInfoPanelShowRatings, settings.photoInfoPanelShowRatings);
        this._localStorage.store(SettingsService.keyPhotoInfoPanelShowMinimap, settings.photoInfoPanelShowMinimap);
        this._localStorage.store(SettingsService.keyPhotoInfoPanelExpandedState, settings.photoInfoPanelExpandedState);
        this._localStorage.store(SettingsService.keyPhotoInfoPanelMinimapMapTypeId, settings.photoInfoPanelMinimapMapTypeId);
        this._localStorage.store(SettingsService.keyPhotoInfoPanelMinimapZoom, settings.photoInfoPanelMinimapZoom);

        this._localStorage.store(SettingsService.keyVideoListShowCategoryBreadcrumbs, settings.videoListShowCategoryBreadcrumbs);
        this._localStorage.store(SettingsService.keyVideoListShowVideoList, settings.videoListShowVideoList);
        this._localStorage.store(SettingsService.keyVideoListThumbnailSize, settings.videoListThumbnailSize.name);
        this._localStorage.store(SettingsService.keyVideoListToolbarExpandedState, settings.videoListToolbarExpandedState);
        this._localStorage.store(SettingsService.keyVideoListVideoSize, settings.videoListVideoSize.name);

        this._localStorage.store(SettingsService.keyVideoInfoPanelExpandedState, settings.videoInfoPanelExpandedState);
        this._localStorage.store(SettingsService.keyVideoInfoPanelShowComments, settings.videoInfoPanelShowComments);
        this._localStorage.store(SettingsService.keyVideoInfoPanelShowMinimap, settings.videoInfoPanelShowMinimap);
        this._localStorage.store(SettingsService.keyVideoInfoPanelShowRatings, settings.videoInfoPanelShowRatings);
        this._localStorage.store(SettingsService.keyVideoInfoPanelMinimapMapTypeId, settings.videoInfoPanelMinimapMapTypeId);
        this._localStorage.store(SettingsService.keyVideoInfoPanelMinimapZoom, settings.videoInfoPanelMinimapZoom);
    }

    clearAuthRedirectUrl(): void {
        this._localStorage.clear(SettingsService.keyAuthRedirectUrl);
    }

    setAuthRedirectUrl(url: string): void {
        this._localStorage.store(SettingsService.keyAuthRedirectUrl, url);
    }

    getAuthRedirectUrl(): string {
        return <string>this._localStorage.retrieve(SettingsService.keyAuthRedirectUrl);
    }

    private getTheme(): Theme {
        const themeName = this._localStorage.retrieve(SettingsService.keyAppTheme);

        try {
            return themeName !== null ? Theme.forName(themeName) : Theme.themeDark;
        } catch {
            return Theme.themeDark;
        }
    }

    private getCategoryListCategoryFilter(): CategoryFilter {
        const name = this._localStorage.retrieve(SettingsService.keyCategoryListCategoryFilter);

        try {
            return name !== null ? CategoryFilter.forName(name) : CategoryFilter.all;
        } catch {
            return CategoryFilter.all;
        }
    }

    private getCategoryListCategoryMargin(): CategoryMargin {
        const name = this._localStorage.retrieve(SettingsService.keyCategoryListCategoryMargin);

        try {
            return name !== null ? CategoryMargin.forName(name) : CategoryMargin.compact;
        } catch {
            return CategoryMargin.compact;
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

    private getVideoListThumbnailSize(): ThumbnailSize {
        const sizeName = this._localStorage.retrieve(SettingsService.keyVideoListThumbnailSize);

        return this.getThumbnailSize(sizeName);
    }

    private getVideoListVideoSize(): VideoSize {
        const sizeName = this._localStorage.retrieve(SettingsService.keyVideoListVideoSize);

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
        const secs = this._localStorage.retrieve(SettingsService.keyPhotoListSlideshowDisplayDurationSeconds);

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
