import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity';

import { PHOTO_CATEGORY_FEATURE_NAME } from './feature-name';
import { photoCategoryAdapter, State } from './state';
import { Category } from 'src/app/models/category.model';

const selectPhotoCategoryState = createFeatureSelector<State>(PHOTO_CATEGORY_FEATURE_NAME);

const { selectAll, selectEntities } = photoCategoryAdapter.getSelectors(selectPhotoCategoryState);

export const selectAllCategories = selectAll;
export const selectPhotoCategoryError = (state: State): string | null => state.error;
export const selectPhotoCategoryIsLoading = (state: State): boolean => state.isLoading;
export const selectCurrentCategoryId = (state: State): number | null => state.currentCategoryId;

export const selectCurrentCategory = createSelector(
    selectEntities,
    selectCurrentCategoryId,
    (entities: Dictionary<Category>, id: number | null) => !!id ? entities[id]! : null
);

export const selectAllYears = createSelector(
    selectAll,
    (categories: Category[]) => [...new Set(categories.map(x => x.year))].sort()
);

export const selectCategoriesForYear = createSelector(
    selectAll,
    (categories: Category[], props: {year: number}) => categories.filter(cat => cat.year === props.year)
);

export const selectCategoryById = createSelector(
    selectEntities,
    (entities: Dictionary<Category>, props: {id: number}) => entities[props.id] ?? null
);
