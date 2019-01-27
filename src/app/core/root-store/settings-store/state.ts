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
        categoryThumbnailSize: null,
        photoListThumbnailSize: null,
        showCategoryPhotoList: true
    }
};
