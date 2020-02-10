import { Theme } from './theme.model';
import { ThumbnailSize } from './thumbnail-size.model';
import { VideoSize } from './video-size.model';
import { CategoryMargin } from './category-margin.model';
import { CategoryFilter } from './category-filter.model';
import { CategoryListType } from './category-list-type.model';

export interface Settings {
    appTheme: Theme;

    categoryListCategoryFilter: CategoryFilter;
    categoryListCategoryMargin: CategoryMargin;
    categoryListShowCategoryTitles: boolean;
    categoryListThumbnailSize: ThumbnailSize;
    categoryListYearFilter: string | number;
    categoryListListType: CategoryListType;
    categoryListListViewThumbnailSize: ThumbnailSize;

    photoListShowCategoryBreadcrumbs: boolean;
    photoListThumbnailSize: ThumbnailSize;
    photoListShowPhotoList: boolean;
    photoListSlideshowDisplayDurationSeconds: number;
    photoListMapViewMapTypeId: string;
    photoListMapViewZoom: number;

    photoInfoPanelShowRatings: boolean;
    photoInfoPanelShowComments: boolean;
    photoInfoPanelShowExif: boolean;
    photoInfoPanelShowEffects: boolean;
    photoInfoPanelShowHistogram: boolean;
    photoInfoPanelShowMinimap: boolean;
    photoInfoPanelExpandedState: boolean;
    photoInfoPanelMinimapZoom: number;
    photoInfoPanelMinimapMapTypeId: string;

    videoListShowCategoryBreadcrumbs: boolean;
    videoListThumbnailSize: ThumbnailSize;
    videoListShowVideoList: boolean;
    videoListVideoSize: VideoSize;

    videoInfoPanelShowRatings: boolean;
    videoInfoPanelShowComments: boolean;
    videoInfoPanelShowMinimap: boolean;
    videoInfoPanelExpandedState: boolean;
    videoInfoPanelMinimapMapTypeId: string;
    videoInfoPanelMinimapZoom: number;

    searchCategoryMargin: CategoryMargin;
    searchShowCategoryTitles: boolean;
    searchShowCategoryYears: boolean;
    searchThumbnailSize: ThumbnailSize;
    searchListType: CategoryListType;
    searchListViewThumbnailSize: ThumbnailSize;
}

export const DEFAULT_SETTINGS = ({
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
});
