import { Settings } from 'src/app/core/models/settings.model';
import { CategoryMargin } from '../../models/category-margin.model';
import { CategoryFilter } from '../../models/category-filter.model';
import { CategoryListType } from '../../models/category-list-type.model';
import { ThumbnailSize } from '../../models/thumbnail-size.model';
import { VideoSize } from '../../models/video-size.model';
import { Theme } from '../../models/theme.model';

export interface State {
    error: string;
    isLoading: boolean;
    settings: Settings;
}

export const initialState: State = {
    error: null,
    isLoading: false,
    settings: {
        appTheme: Theme.themeDark,

        categoryListCategoryFilter: CategoryFilter.all,
        categoryListCategoryMargin: CategoryMargin.compact,
        categoryListShowCategoryTitles: true,
        categoryListThumbnailSize: ThumbnailSize.default,
        categoryListYearFilter: 'all',
        categoryListListType: CategoryListType.grid,
        categoryListListViewThumbnailSize: ThumbnailSize.default,

        photoListShowCategoryBreadcrumbs: true,
        photoListThumbnailSize: ThumbnailSize.default,
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
        videoListThumbnailSize: ThumbnailSize.default,
        videoListShowVideoList: true,
        videoListVideoSize: VideoSize.small,

        videoInfoPanelShowRatings: true,
        videoInfoPanelShowComments: true,
        videoInfoPanelShowMinimap: false,
        videoInfoPanelExpandedState: false,
        videoInfoPanelMinimapMapTypeId: 'roadmap',
        videoInfoPanelMinimapZoom: 10,

        searchCategoryMargin: CategoryMargin.compact,
        searchShowCategoryTitles: true,
        searchShowCategoryYears: true,
        searchThumbnailSize: ThumbnailSize.default,
        searchListType: CategoryListType.grid,
        searchListViewThumbnailSize: ThumbnailSize.default
    }
};
