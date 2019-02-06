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
        theme: null,
        showCategoryTitles: true,
        showCategoryBreadcrumbs: true,
        categoryThumbnailSize: null,
        photoListThumbnailSize: null,
        showCategoryPhotoList: true,
        randomDisplayDurationSeconds: 3,
        photoInfoPanelShowRatings: true,
        photoInfoPanelShowComments: true,
        photoInfoPanelShowExif: false,
        photoInfoPanelShowEffects: false
    }
};
