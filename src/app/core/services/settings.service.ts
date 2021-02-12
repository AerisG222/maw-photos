import { Injectable } from '@angular/core';

import { AppSettings, DEFAULT_APP_SETTINGS } from '@models';
import { CategoryFilterSettings, DEFAULT_CATEGORY_FILTER_SETTINGS } from '@models';
import { CategoryGridViewSettings, DEFAULT_CATEGORY_GRID_VIEW_SETTINGS } from '@models';
import { CategoryListViewSettings, DEFAULT_CATEGORY_LIST_VIEW_SETTINGS } from '@models';
import { CategoryPageSettings, DEFAULT_CATEGORY_SETTINGS } from '@models';
import { DEFAULT_PHOTO_DETAIL_VIEW_SETTINGS, PhotoDetailViewSettings } from '@models';
import { DEFAULT_PHOTO_GRID_VIEW_SETTINGS, PhotoGridViewSettings } from '@models';
import { DEFAULT_PHOTO_INFO_PANEL_SETTINGS, PhotoInfoPanelSettings } from '@models';
import { DEFAULT_PHOTO_MAP_VIEW_SETTINGS, PhotoMapViewSettings } from '@models';
import { DEFAULT_PHOTO_SETTINGS, PhotoPageSettings } from '@models';
import { DEFAULT_RANDOM_SETTINGS, RandomPageSettings } from '@models';
import { DEFAULT_SEARCH_GRID_VIEW_SETTINGS, SearchGridViewSettings } from '@models';
import { DEFAULT_SEARCH_LIST_VIEW_SETTINGS, SearchListViewSettings } from '@models';
import { DEFAULT_SEARCH_SETTINGS, SearchPageSettings } from '@models';
import { Settings } from '@models';
import { DEFAULT_VIDEO_DETAIL_VIEW_SETTINGS, VideoDetailViewSettings } from '@models';
import { DEFAULT_VIDEO_INFO_PANEL_SETTINGS, VideoInfoPanelSettings } from '@models';
import { LocalStorageService } from './local-storage.service';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {
    private static readonly currentSettingsVersion = 1;

    private static readonly keyAuthRedirectUrl = 'authRedirectUrl';

    private static readonly keyVersion = 'version';

    private static readonly keyApp = 'app';

    private static readonly keyCategoryFilter = 'categoryFilter';
    private static readonly keyCategoryGridView = 'categoryGridView';
    private static readonly keyCategoryListView = 'categoryListView';
    private static readonly keyCategoryPage = 'categoryPage';

    private static readonly keyPhotoDetailView = 'photoDetailView';
    private static readonly keyPhotoGridView = 'photoGridView';
    private static readonly keyPhotoInfoPanel = 'photoInfoPanel';
    private static readonly keyPhotoMapView = 'photoMapView';
    private static readonly keyPhotoPage = 'photoPage';

    private static readonly keyRandomDetailView = 'randomDetailView';
    private static readonly keyRandomGridView = 'randomGridView';
    private static readonly keyRandomInfoPanel = 'randomInfoPanel';
    private static readonly keyRandomPage = 'randomPage';

    private static readonly keySearchGridView = 'searchGridView';
    private static readonly keySearchListView = 'searchListView';
    private static readonly keySearchPage = 'searchPage';

    private static readonly keyVideoDetailView = 'videoDetailView';
    private static readonly keyVideoInfoPanel = 'videoInfoPanel';
    private static readonly keyVideoPage = 'videoPage';

    constructor(private localStorage: LocalStorageService) {
        this.cleanLegacySettings();
    }

    cleanLegacySettings() {
        if(!!!this.getVersion()) {
            this.localStorage.clear();
            this.saveVersion();
        }
    }

    getAppSettings(): AppSettings {
        return this.localStorage.get(SettingsService.keyApp) ?? DEFAULT_APP_SETTINGS;
    }

    getCategoryFilterSettings(): CategoryFilterSettings {
        return this.localStorage.get(SettingsService.keyCategoryFilter) ?? DEFAULT_CATEGORY_FILTER_SETTINGS;
    }

    getCategoryGridViewSettings(): CategoryGridViewSettings {
        return this.localStorage.get(SettingsService.keyCategoryGridView) ?? DEFAULT_CATEGORY_GRID_VIEW_SETTINGS;
    }

    getCategoryListViewSettings(): CategoryListViewSettings {
        return this.localStorage.get(SettingsService.keyCategoryListView) ?? DEFAULT_CATEGORY_LIST_VIEW_SETTINGS;
    }

    getCategoryPageSettings(): CategoryPageSettings {
        return this.localStorage.get(SettingsService.keyCategoryPage) ?? DEFAULT_CATEGORY_SETTINGS;
    }

    getPhotoDetailViewSettings(): PhotoDetailViewSettings {
        return this.localStorage.get(SettingsService.keyPhotoDetailView) ?? DEFAULT_PHOTO_DETAIL_VIEW_SETTINGS;
    }

    getPhotoGridViewSettings(): PhotoGridViewSettings {
        return this.localStorage.get(SettingsService.keyPhotoGridView) ?? DEFAULT_PHOTO_GRID_VIEW_SETTINGS;
    }

    getPhotoInfoPanelSettings(): PhotoInfoPanelSettings {
        return this.localStorage.get(SettingsService.keyPhotoInfoPanel) ?? DEFAULT_PHOTO_INFO_PANEL_SETTINGS;
    }

    getPhotoMapViewSettings(): PhotoMapViewSettings {
        return this.localStorage.get(SettingsService.keyPhotoMapView) ?? DEFAULT_PHOTO_MAP_VIEW_SETTINGS;
    }

    getPhotoPageSettings(): PhotoPageSettings {
        return this.localStorage.get(SettingsService.keyPhotoPage) ?? DEFAULT_PHOTO_SETTINGS;
    }

    getRandomDetailViewSettings(): PhotoDetailViewSettings {
        return this.localStorage.get(SettingsService.keyRandomDetailView) ?? DEFAULT_PHOTO_DETAIL_VIEW_SETTINGS;
    }

    getRandomGridViewSettings(): PhotoGridViewSettings {
        return this.localStorage.get(SettingsService.keyRandomGridView) ?? DEFAULT_PHOTO_GRID_VIEW_SETTINGS;
    }

    getRandomInfoPanelSettings(): PhotoInfoPanelSettings {
        return this.localStorage.get(SettingsService.keyRandomInfoPanel) ?? DEFAULT_PHOTO_INFO_PANEL_SETTINGS;
    }

    getRandomPageSettings(): RandomPageSettings {
        return this.localStorage.get(SettingsService.keyRandomPage) ?? DEFAULT_RANDOM_SETTINGS;
    }

    getSearchGridViewSettings(): SearchGridViewSettings {
        return this.localStorage.get(SettingsService.keySearchGridView) ?? DEFAULT_SEARCH_GRID_VIEW_SETTINGS;
    }

    getSearchListViewSettings(): SearchListViewSettings {
        return this.localStorage.get(SettingsService.keySearchListView) ?? DEFAULT_SEARCH_LIST_VIEW_SETTINGS;
    }

    getSearchPageSettings(): SearchPageSettings {
        return this.localStorage.get(SettingsService.keySearchPage) ?? DEFAULT_SEARCH_SETTINGS;
    }

    getVideoDetailViewSettings(): VideoDetailViewSettings {
        return this.localStorage.get(SettingsService.keyVideoDetailView) ?? DEFAULT_VIDEO_DETAIL_VIEW_SETTINGS;
    }

    getVideoInfoPanelSettings(): VideoInfoPanelSettings {
        return this.localStorage.get(SettingsService.keyVideoInfoPanel) ?? DEFAULT_VIDEO_INFO_PANEL_SETTINGS;
    }

    getVideoPageSettings(): VideoPageSettings {
        return this.localStorage.get(SettingsService.keyVideoPage) ?? DEFAULT_VIDEO_SETTINGS;
    }

    getAllSettings(): Settings {
        return {
            app: this.getAppSettings(),

            categoryFilter: this.getCategoryFilterSettings(),
            categoryGridView: this.getCategoryGridViewSettings(),
            categoryListView: this.getCategoryListViewSettings(),
            categoryPage: this.getCategoryPageSettings(),

            photoDetailView: this.getPhotoDetailViewSettings(),
            photoGridView: this.getPhotoGridViewSettings(),
            photoInfoPanel: this.getPhotoInfoPanelSettings(),
            photoMapView: this.getPhotoMapViewSettings(),
            photoPage: this.getPhotoPageSettings(),

            randomDetailView: this.getRandomDetailViewSettings(),
            randomGridView: this.getRandomGridViewSettings(),
            randomInfoPanel: this.getRandomInfoPanelSettings(),
            randomPage: this.getRandomPageSettings(),

            searchGridView: this.getSearchGridViewSettings(),
            searchListView: this.getSearchListViewSettings(),
            searchPage: this.getSearchPageSettings(),

            videoDetailView: this.getVideoDetailViewSettings(),
            videoInfoPanel: this.getVideoInfoPanelSettings(),
            videoPage: this.getVideoPageSettings()
        };
    }

    saveAppSettings(settings: AppSettings): void {
        this.save(SettingsService.keyApp, settings);
    }

    saveCategoryFilterSettings(settings: CategoryFilterSettings): void {
        this.save(SettingsService.keyCategoryFilter, settings);
    }

    saveCategoryGridViewSettings(settings: CategoryGridViewSettings): void {
        this.save(SettingsService.keyCategoryGridView, settings);
    }

    saveCategoryListViewSettings(settings: CategoryListViewSettings): void {
        this.save(SettingsService.keyCategoryListView, settings);
    }

    saveCategoryPageSettings(settings: CategoryPageSettings): void {
        this.save(SettingsService.keyCategoryPage, settings);
    }

    savePhotoDetailViewSettings(settings: PhotoDetailViewSettings): void {
        this.save(SettingsService.keyPhotoDetailView, settings);
    }

    savePhotoGridViewSettings(settings: PhotoGridViewSettings): void {
        this.save(SettingsService.keyPhotoGridView, settings);
    }

    savePhotoInfoPanelSettings(settings: PhotoInfoPanelSettings): void {
        this.save(SettingsService.keyPhotoInfoPanel, settings);
    }

    savePhotoMapViewSettings(settings: PhotoMapViewSettings): void {
        this.save(SettingsService.keyPhotoMapView, settings);
    }

    savePhotoPageSettings(settings: PhotoPageSettings): void {
        this.save(SettingsService.keyPhotoPage, settings);
    }

    saveRandomDetailViewSettings(settings: PhotoDetailViewSettings): void {
        this.save(SettingsService.keyRandomDetailView, settings);
    }

    saveRandomGridViewSettings(settings: PhotoGridViewSettings): void {
        this.save(SettingsService.keyRandomGridView, settings);
    }

    saveRandomInfoPanelSettings(settings: PhotoInfoPanelSettings): void {
        this.save(SettingsService.keyRandomInfoPanel, settings);
    }

    saveRandomPageSettings(settings: RandomPageSettings): void {
        this.save(SettingsService.keyRandomPage, settings);
    }

    saveSearchGridViewSettings(settings: SearchGridViewSettings): void {
        this.save(SettingsService.keySearchGridView, settings);
    }

    saveSearchListViewSettings(settings: SearchListViewSettings): void {
        this.save(SettingsService.keySearchListView, settings);
    }

    saveSearchPageSettings(settings: SearchPageSettings): void {
        this.save(SettingsService.keySearchPage, settings);
    }

    saveVideoDetailViewSettings(settings: VideoDetailViewSettings): void {
        this.save(SettingsService.keyVideoDetailView, settings);
    }

    saveVideoInfoPanelSettings(settings: VideoInfoPanelSettings): void {
        this.save(SettingsService.keyVideoInfoPanel, settings);
    }

    saveVideoPageSettings(settings: VideoPageSettings): void {
        this.save(SettingsService.keyVideoPage, settings);
    }

    saveAllSettings(settings: Settings): void {
        if (!!!settings) {
            return;
        }

        this.saveAppSettings(settings.app);

        this.saveCategoryFilterSettings(settings.categoryFilter);
        this.saveCategoryGridViewSettings(settings.categoryGridView);
        this.saveCategoryListViewSettings(settings.categoryListView);
        this.saveCategoryPageSettings(settings.categoryPage);

        this.savePhotoDetailViewSettings(settings.photoDetailView);
        this.savePhotoGridViewSettings(settings.photoGridView);
        this.savePhotoInfoPanelSettings(settings.photoInfoPanel);
        this.savePhotoMapViewSettings(settings.photoMapView);
        this.savePhotoPageSettings(settings.photoPage);

        this.saveRandomDetailViewSettings(settings.randomDetailView);
        this.saveRandomGridViewSettings(settings.randomGridView);
        this.saveRandomInfoPanelSettings(settings.randomInfoPanel);
        this.saveRandomPageSettings(settings.randomPage);

        this.saveSearchGridViewSettings(settings.searchGridView);
        this.saveSearchListViewSettings(settings.searchListView);
        this.saveSearchPageSettings(settings.searchPage);

        this.saveVideoDetailViewSettings(settings.videoDetailView);
        this.saveVideoInfoPanelSettings(settings.videoInfoPanel);
        this.saveVideoPageSettings(settings.videoPage);
    }

    clearAuthRedirectUrl(): void {
        this.localStorage.clear(SettingsService.keyAuthRedirectUrl);
    }

    setAuthRedirectUrl(url: string): void {
        this.localStorage.set(SettingsService.keyAuthRedirectUrl, url);
    }

    getAuthRedirectUrl(): string {
        const url = this.localStorage.get<string | null>(SettingsService.keyAuthRedirectUrl);

        if (!!url) {
            return url;
        }

        console.error('did not obtain valid auth redirect url');

        return '';
    }

    private getVersion(): number | null {
        return this.localStorage.get(SettingsService.keyVersion);
    }

    private saveVersion() {
        this.localStorage.set(SettingsService.keyVersion, SettingsService.currentSettingsVersion);
    }

    private save<T>(key: string, value: T) {
        this.saveVersion();
        this.localStorage.set(key, value);
    }
}
