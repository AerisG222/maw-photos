import { SettingsStoreState } from './settings-store';
import { PhotoCategoriesStoreState } from './photo-category-store';

export interface State {
    settings: SettingsStoreState.State;
    categories: PhotoCategoriesStoreState.State;
}
