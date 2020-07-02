import { createFeatureSelector, createSelector } from '@ngrx/store';

import { VIDEO_CATEGORY_FEATURE_NAME } from './feature-name';
import { VideoCategoryAdapter, State } from './state';
import { Category } from 'src/app/models/category.model';

const getError = (state: State): string | null => state.error;
const getIsLoading = (state: State): boolean => state.isLoading;
const getCurrentCategory = (state: State): Category | null => state.currentCategory;
const getAllYears = (state: State): number[] | null => !!state.categoryIdsByYear ? [...state.categoryIdsByYear.keys()] : null;
const getCategoryById = (state: State, id: number): Category | null => state.entities[id] ?? null;

const getCategoriesForYear = (state: State, year: number): Category[] => {
    if (!!state.categoryIdsByYear && state.categoryIdsByYear.has(year)) {
        const idsForYear = state.categoryIdsByYear.get(year) as number[];

        // sort newest to oldest
        const sortedIdsForYear = [...idsForYear].sort((a, b) => b - a);

        return sortedIdsForYear.map(id => state.entities[id] as Category);
    }

    return [];
};

export const selectVideoCategoryState = createFeatureSelector<State>(VIDEO_CATEGORY_FEATURE_NAME);

export const selectAllCategories = VideoCategoryAdapter.getSelectors(selectVideoCategoryState).selectAll;

export const selectVideoCategoryError = createSelector(selectVideoCategoryState, getError);
export const selectVideoCategoryIsLoading = createSelector(selectVideoCategoryState, getIsLoading);
export const selectCurrentCategory = createSelector(selectVideoCategoryState, getCurrentCategory);
export const selectAllYears = createSelector(selectVideoCategoryState, getAllYears);

export const selectCategoriesForYear = createSelector(selectVideoCategoryState,
    (state: State, props: {year: number}) => getCategoriesForYear(state, props.year)
);

export const selectCategoryById = createSelector(selectVideoCategoryState,
    (state: State, props: {id: number}) => getCategoryById(state, props.id)
);
