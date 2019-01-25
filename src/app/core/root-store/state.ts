import { MetaReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';

import { PhotoCategoryStoreState } from './photo-category-store';
import { SettingsStoreState } from './settings-store';
import { environment } from '../../../environments/environment';

export const metaReducers: MetaReducer<State>[] = !environment.production ? [storeFreeze] : [];

export interface State {
    settings: SettingsStoreState.State;
    categories: PhotoCategoryStoreState.State;
}
