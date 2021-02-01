import { CategoryMargin } from '../category-margin.model';
import { CategoryTypeFilter } from '../category-type-filter.model';
import { CategoryViewMode } from '../category-view-mode.model';
import { CategoryGridViewSettings, DEFAULT_CATEGORY_GRID_VIEW_SETTINGS } from './category-grid-view-settings';
import { CategoryListViewSettings, DEFAULT_CATEGORY_LIST_VIEW_SETTINGS } from './category-list-view-settings';

export interface CategorySettings {
    viewMode: CategoryViewMode;

    typeFilter: CategoryTypeFilter;
    yearFilter: string | number;
    missingGpsFilter: boolean;

    gridView: CategoryGridViewSettings;
    listView: CategoryListViewSettings;
}

export const DEFAULT_CATEGORY_SETTINGS: CategorySettings = {
    viewMode: CategoryViewMode.grid,

    typeFilter: CategoryTypeFilter.all,
    yearFilter: 'all',
    missingGpsFilter: false,

    gridView: DEFAULT_CATEGORY_GRID_VIEW_SETTINGS,
    listView: DEFAULT_CATEGORY_LIST_VIEW_SETTINGS
};
