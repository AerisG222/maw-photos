import { CategoryMargin } from '@models';

export interface SearchGridViewSettings {
    margin: CategoryMargin;
    showTitles: boolean;
    showYears: boolean;
}

export const DEFAULT_SEARCH_GRID_VIEW_SETTINGS: SearchGridViewSettings = {
    margin: CategoryMargin.dense,
    showTitles: true,
    showYears: true
};
