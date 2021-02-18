import { AppSettings, DEFAULT_APP_SETTINGS } from './app-settings';
import {
    CategoryFilterSettings,
    DEFAULT_CATEGORY_FILTER_SETTINGS,
} from './category-filter-settings';
import {
    CategoryGridViewSettings,
    DEFAULT_CATEGORY_GRID_VIEW_SETTINGS,
} from './category-grid-view-settings';
import {
    CategoryListViewSettings,
    DEFAULT_CATEGORY_LIST_VIEW_SETTINGS,
} from './category-list-view-settings';
import {
    CategoryPageSettings,
    DEFAULT_CATEGORY_SETTINGS,
} from './category-page-settings';
import {
    DEFAULT_PHOTO_DETAIL_VIEW_SETTINGS,
    PhotoDetailViewSettings,
} from './photo-detail-view-settings';
import {
    DEFAULT_PHOTO_GRID_VIEW_SETTINGS,
    PhotoGridViewSettings,
} from './photo-grid-view-settings';
import {
    DEFAULT_PHOTO_INFO_PANEL_SETTINGS,
    PhotoInfoPanelSettings,
} from './photo-info-panel-settings';
import {
    DEFAULT_PHOTO_MAP_VIEW_SETTINGS,
    PhotoMapViewSettings,
} from './photo-map-view-settings';
import {
    DEFAULT_PHOTO_SETTINGS,
    PhotoPageSettings,
} from './photo-page-settings';
import {
    DEFAULT_RANDOM_SETTINGS,
    RandomPageSettings,
} from './random-page-settings';
import {
    DEFAULT_SEARCH_GRID_VIEW_SETTINGS,
    SearchGridViewSettings,
} from './search-grid-view-settings';
import {
    DEFAULT_SEARCH_LIST_VIEW_SETTINGS,
    SearchListViewSettings,
} from './search-list-view-settings';
import {
    DEFAULT_SEARCH_SETTINGS,
    SearchPageSettings,
} from './search-page-settings';
import {
    DEFAULT_VIDEO_DETAIL_VIEW_SETTINGS,
    VideoDetailViewSettings,
} from './video-detail-view-settings';
import {
    DEFAULT_VIDEO_INFO_PANEL_SETTINGS,
    VideoInfoPanelSettings,
} from './video-info-panel-settings';

export interface Settings {
    app: AppSettings;

    categoryFilter: CategoryFilterSettings;
    categoryGridView: CategoryGridViewSettings;
    categoryListView: CategoryListViewSettings;
    categoryPage: CategoryPageSettings;

    photoDetailView: PhotoDetailViewSettings;
    photoGridView: PhotoGridViewSettings;
    photoInfoPanel: PhotoInfoPanelSettings;
    photoMapView: PhotoMapViewSettings;
    photoPage: PhotoPageSettings;

    randomDetailView: PhotoDetailViewSettings;
    randomGridView: PhotoGridViewSettings;
    randomInfoPanel: PhotoInfoPanelSettings;
    randomPage: RandomPageSettings;

    searchGridView: SearchGridViewSettings;
    searchListView: SearchListViewSettings;
    searchPage: SearchPageSettings;

    videoDetailView: VideoDetailViewSettings;
    videoInfoPanel: VideoInfoPanelSettings;
}

export const DEFAULT_SETTINGS = {
    app: DEFAULT_APP_SETTINGS,

    categoryFilter: DEFAULT_CATEGORY_FILTER_SETTINGS,
    categoryGridView: DEFAULT_CATEGORY_GRID_VIEW_SETTINGS,
    categoryListView: DEFAULT_CATEGORY_LIST_VIEW_SETTINGS,
    categoryPage: DEFAULT_CATEGORY_SETTINGS,

    photoDetailView: DEFAULT_PHOTO_DETAIL_VIEW_SETTINGS,
    photoGridView: DEFAULT_PHOTO_GRID_VIEW_SETTINGS,
    photoInfoPanel: DEFAULT_PHOTO_INFO_PANEL_SETTINGS,
    photoMapView: DEFAULT_PHOTO_MAP_VIEW_SETTINGS,
    photoPage: DEFAULT_PHOTO_SETTINGS,

    randomDetailView: DEFAULT_PHOTO_DETAIL_VIEW_SETTINGS,
    randomGridView: DEFAULT_PHOTO_GRID_VIEW_SETTINGS,
    randomInfoPanel: DEFAULT_PHOTO_INFO_PANEL_SETTINGS,
    randomPage: DEFAULT_RANDOM_SETTINGS,

    searchGridView: DEFAULT_SEARCH_GRID_VIEW_SETTINGS,
    searchListView: DEFAULT_SEARCH_LIST_VIEW_SETTINGS,
    searchPage: DEFAULT_SEARCH_SETTINGS,

    videoDetailView: DEFAULT_VIDEO_DETAIL_VIEW_SETTINGS,
    videoInfoPanel: DEFAULT_VIDEO_INFO_PANEL_SETTINGS,
};
