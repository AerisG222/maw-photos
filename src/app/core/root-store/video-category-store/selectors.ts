import { createFeatureSelector, createSelector } from '@ngrx/store';

import { VIDEO_CATEGORY_FEATURE_NAME } from './feature-name';
import { VideoCategoryAdapter, State } from './state';
import { Category } from 'src/app/models/category.model';

const getError = (state: State): any => state.error;
const getIsLoading = (state: State): boolean => state.isLoading;
const getCurrentCategory = (state: State): Category => state.currentCategory;
const getAllYears = (state: State): number[] => Object.keys(state.categoryIdsByYear).map(y => Number(y));
const getCategoryById = (state: State, id: number): Category => state.entities[id];

const getCategoriesForYear = (state: State, year: number): Category[] => {
    if (!!state.categoryIdsByYear && !!state.categoryIdsByYear[year]) {
        const idsForYear = state.categoryIdsByYear[year] as number[];

        return idsForYear.map(id => state.entities[id]);
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
