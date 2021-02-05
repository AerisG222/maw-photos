import { AppSettings } from './app-settings';
import { CategoryFilterSettings } from './category-filter-settings';
import { CategoryGridViewSettings } from './category-grid-view-settings';
import { CategoryListViewSettings } from './category-list-view-settings';
import { CategoryPageSettings } from './category-page-settings';
import { PhotoDetailViewSettings } from './photo-detail-view-settings';
import { PhotoGridViewSettings } from './photo-grid-view-settings';
import { PhotoInfoPanelSettings } from './photo-info-panel-settings';
import { PhotoMapViewSettings } from './photo-map-view-settings';
import { PhotoPageSettings } from './photo-page-settings';
import { RandomPageSettings } from './random-page-settings';
import { SearchGridViewSettings } from './search-grid-view-settings';
import { SearchListViewSettings } from './search-list-view-settings';
import { SearchPageSettings } from './search-page-settings';
import { VideoDetailViewSettings } from './video-detail-view-settings';
import { VideoInfoPanelSettings } from './video-info-panel-settings';
import { VideoPageSettings } from './video-page-settings';

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
    videoPage: VideoPageSettings;
}
