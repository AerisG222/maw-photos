import { createFeatureSelector, createSelector } from '@ngrx/store';

import { PHOTO_CATEGORY_FEATURE_NAME } from './feature-name';
import { photoCategoryAdapter, State } from './state';
import { Category } from 'src/app/models/category.model';

const getError = (state: State): any => state.error;
const getIsLoading = (state: State): boolean => state.isLoading;
const getCurrentCategory = (state: State): Category => state.currentCategory;
const getAllYears = (state: State): number[] => Object.keys(state.categoryIdsByYear).map(y => Number(y));
const getCategoryById = (state: State, id: number): Category => state.entities[id];

const getCategoriesForYear = (state: State, year: number): Category[] => {
    if (!!state.categoryIdsByYear && !!state.categoryIdsByYear[year]) {
        const idsForYear = state.categoryIdsByYear[year] as number[];

        // sort newest to oldest
        const sortedIdsForYear = [...idsForYear].sort((a, b) => b - a);

        return sortedIdsForYear.map(id => state.entities[id]);
    }

    return [];
};

export const selectPhotoCategoryState = createFeatureSelector<State>(PHOTO_CATEGORY_FEATURE_NAME);

export const selectAllCategories = photoCategoryAdapter.getSelectors(selectPhotoCategoryState).selectAll;

export const selectPhotoCategoryError = createSelector(selectPhotoCategoryState, getError);
export const selectPhotoCategoryIsLoading = createSelector(selectPhotoCategoryState, getIsLoading);
export const selectCurrentCategory = createSelector(selectPhotoCategoryState, getCurrentCategory);
export const selectAllYears = createSelector(selectPhotoCategoryState, getAllYears);

export const selectCategoriesForYear = createSelector(selectPhotoCategoryState,
    (state: State, props: {year: number}) => getCategoriesForYear(state, props.year)
);

export const selectCategoryById = createSelector(selectPhotoCategoryState,
    (state: State, props: {id: number}) => getCategoryById(state, props.id)
);
