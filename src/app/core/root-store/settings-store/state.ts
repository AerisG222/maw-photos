import { Settings } from 'src/app/core/models/settings.model';

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

        categoryListShowCategoryTitles: true,
        categoryListThumbnailSize: null,

        photoListShowCategoryBreadcrumbs: true,
        photoListThumbnailSize: null,
        photoListShowPhotoList: true,
        photoListSlideshowDisplayDurationSeconds: 2,
        photoListToolbarExpandedState: true,
        photoListFullscreenToolbarExpandedState: true,

        photoInfoPanelShowRatings: true,
        photoInfoPanelShowComments: true,
        photoInfoPanelShowExif: false,
        photoInfoPanelShowEffects: false,
        photoInfoPanelShowMinimap: false,
        photoInfoPanelExpandedState: false,

        videoListShowCategoryBreadcrumbs: true,
        videoListThumbnailSize: null,
        videoListShowVideoList: true,
        videoListToolbarExpandedState: true,
        videoListVideoSize: null,

        videoInfoPanelShowRatings: true,
        videoInfoPanelShowComments: true,
        videoInfoPanelShowMinimap: false,
        videoInfoPanelExpandedState: false
    }
};
