import { PhotoCategoryStoreState } from './photo-category-store';
import { SettingsStoreState } from './settings-store';

export interface State {
    settings: SettingsStoreState.State;
    categories: PhotoCategoryStoreState.State;
}
