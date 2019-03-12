import {
    createFeatureSelector,
    createSelector
} from '@ngrx/store';

import { PhotoCategory } from 'src/app/core/models/photo-category.model';
import { PHOTO_CATEGORY_FEATURE_NAME } from './feature-name';
import { photoCategoryAdapter, State } from './state';

const getError = (state: State): any => state.error;
const getIsLoading = (state: State): boolean => state.isLoading;
const getCurrentCategory = (state: State): PhotoCategory => state.currentCategory;

export const selectPhotoCategoryState = createFeatureSelector<State>(PHOTO_CATEGORY_FEATURE_NAME);

export const selectAllCategories = photoCategoryAdapter.getSelectors(selectPhotoCategoryState).selectAll;

export const selectAllYears =
    createSelector(selectAllCategories, (categories: PhotoCategory[]) => {
        if (categories) {
            const allYears = categories.map(x => x.year);

            return Array.from(new Set(allYears));
        } else {
            return null;
        }
    });

export const selectCategoriesForYear =
    createSelector(selectAllCategories, (categories: PhotoCategory[], props: { year: number }) => {
        if (categories) {
            return categories.filter(x => x.year === props.year);
        } else {
            return null;
        }
    });

export const selectCategoryById =
    createSelector(selectAllCategories, (categories: PhotoCategory[], props: {id: number}) => {
        if (categories) {
            return categories.find(c => c.id === props.id);
        } else {
            return null;
        }
    });

export const selectPhotoCategoryError = createSelector(selectPhotoCategoryState, getError);
export const selectPhotoCategoryIsLoading = createSelector(selectPhotoCategoryState, getIsLoading);
export const selectCurrentCategory = createSelector(selectPhotoCategoryState, getCurrentCategory);
