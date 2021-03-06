import { CategoryViewMode } from '../category-view-mode';

export interface SearchPageSettings {
    viewMode: CategoryViewMode;
}

export const DEFAULT_SEARCH_SETTINGS: SearchPageSettings = {
    viewMode: CategoryViewMode.grid,
};
