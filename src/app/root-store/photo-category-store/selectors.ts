import {
    createFeatureSelector,
    createSelector,
    MemoizedSelector
} from '@ngrx/store';

import { ICategory } from '../../models/icategory.model';
import { photoCategoryAdapter, State } from './state';
import { PHOTO_CATEGORY_FEATURE_NAME } from './photo-category-store.module';

export const getError = (state: State): any => state.error;
export const getIsLoading = (state: State): boolean => state.isLoading;

export const selectPhotoCategoryState: MemoizedSelector<object, State> = createFeatureSelector<State>(PHOTO_CATEGORY_FEATURE_NAME);

export const selectAllCategories: (state: object) => ICategory[] = photoCategoryAdapter.getSelectors(selectPhotoCategoryState).selectAll;

export const selectAllYears = () =>
    createSelector(selectAllCategories, (categories: ICategory[]) => {
        if (categories) {
            const allYears = categories.map(x => x.year);

            return Array.from(new Set(allYears));
        } else {
            return null;
        }
    });

export const selectCategoryById = (id: number) =>
    createSelector(selectAllCategories, (categories: ICategory[]) => {
        if (categories) {
            return categories.find(c => c.id === id);
        } else {
            return null;
        }
    });

export const selectPhotoCategoryError: MemoizedSelector<object, any> = createSelector(selectPhotoCategoryState, getError);
export const selectPhotoCategoryIsLoading: MemoizedSelector<object, boolean> = createSelector(selectPhotoCategoryState, getIsLoading);
