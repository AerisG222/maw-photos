import { ISettings } from 'src/app/models/isettings.model';

export interface State {
    error: string;
    isLoading: boolean;
    settings: ISettings;
}

export const initialState: State = {
    error: null,
    isLoading: false,
    settings: {
        theme: null,
        showCategoryTitles: true,
        smallCategoryThumbnails: false
    }
};
