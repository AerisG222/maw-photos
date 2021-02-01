import { CategoryViewMode } from '../category-view-mode.model';
import { CategoryListViewSettings, DEFAULT_CATEGORY_LIST_VIEW_SETTINGS } from './category-list-view-settings';
import { DEFAULT_SEARCH_GRID_VIEW_SETTINGS, SearchGridViewSettings } from './search-grid-view-settings';

export interface SearchSettings {
    viewMode: CategoryViewMode;

    gridView: SearchGridViewSettings;
    listView: CategoryListViewSettings;
}

export const DEFAULT_SEARCH_SETTINGS: SearchSettings = {
    viewMode: CategoryViewMode.grid,

    gridView: DEFAULT_SEARCH_GRID_VIEW_SETTINGS,
    listView: DEFAULT_CATEGORY_LIST_VIEW_SETTINGS
};
