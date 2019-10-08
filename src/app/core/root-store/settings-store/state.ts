import { Settings } from 'src/app/core/models/settings.model';
import { CategoryMargin } from '../../models/category-margin.model';
import { CategoryFilter } from '../../models/category-filter.model';
import { CategoryListType } from '../../models/category-list-type.model';

export interface State {
    error: string;
    isLoading: boolean;
    settings: Settings;
}

export const initialState: State = {
    error: null,
    isLoading: false,
    settings: {
        appTheme: null,

        categoryListCategoryFilter: CategoryFilter.all,
        categoryListCategoryMargin: CategoryMargin.compact,
        categoryListShowCategoryTitles: true,
        categoryListThumbnailSize: null,
        categoryListYearFilter: 'all',
        categoryListListType: CategoryListType.grid,
        categoryListListViewThumbnailSize: null,

        photoListShowCategoryBreadcrumbs: true,
        photoListThumbnailSize: null,
        photoListShowPhotoList: true,
        photoListSlideshowDisplayDurationSeconds: 2,
        photoListMapViewMapTypeId: 'roadmap',
        photoListMapViewZoom: 10,

        photoInfoPanelShowRatings: true,
        photoInfoPanelShowComments: true,
        photoInfoPanelShowExif: false,
        photoInfoPanelShowEffects: false,
        photoInfoPanelShowHistogram: false,
        photoInfoPanelShowMinimap: false,
        photoInfoPanelExpandedState: false,
        photoInfoPanelMinimapMapTypeId: 'roadmap',
        photoInfoPanelMinimapZoom: 10,

        videoListShowCategoryBreadcrumbs: true,
        videoListThumbnailSize: null,
        videoListShowVideoList: true,
        videoListVideoSize: null,

        videoInfoPanelShowRatings: true,
        videoInfoPanelShowComments: true,
        videoInfoPanelShowMinimap: false,
        videoInfoPanelExpandedState: false,
        videoInfoPanelMinimapMapTypeId: 'roadmap',
        videoInfoPanelMinimapZoom: 10
    }
};
