import { CategoryTypeFilter } from '../category-type-filter.model';

export interface CategoryFilterSettings {
    typeFilter: CategoryTypeFilter;
    yearFilter: string | number;
    missingGpsFilter: boolean;
}

export const DEFAULT_CATEGORY_FILTER_SETTINGS: CategoryFilterSettings = {
    typeFilter: CategoryTypeFilter.all,
    yearFilter: 'all',
    missingGpsFilter: false,
};
