import { CategoryViewMode } from '../category-view-mode';

export interface CategoryPageSettings {
    viewMode: CategoryViewMode;
}

export const DEFAULT_CATEGORY_SETTINGS: CategoryPageSettings = {
    viewMode: CategoryViewMode.grid,
};
