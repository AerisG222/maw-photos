import { SettingsStoreState } from './settings-store';
import { PhotoCategoryStoreState } from './photo-category-store';

export interface State {
    settings: SettingsStoreState.State;
    categories: PhotoCategoryStoreState.State;
}
