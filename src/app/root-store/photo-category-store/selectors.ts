import {
    createFeatureSelector,
    createSelector,
    MemoizedSelector
} from '@ngrx/store';

import { ICategory } from '../../models/icategory.model';
import { featureAdapter, State } from './state';

export const getError = (state: State): any => state.error;
export const getIsLoading = (state: State): boolean => state.isLoading;

export const selectCategoryState: MemoizedSelector<object, State> = createFeatureSelector<State>('Category');

export const selectAllCategories: (state: object) => ICategory[] = featureAdapter.getSelectors(selectCategoryState).selectAll;

export const selectAllYears = () =>
    createSelector(this.selectAllCategories, (allCategories: ICategory[]) => {
        if (allCategories) {
            const allYears = allCategories.map(x => x.year);

            return Array.from(new Set(allYears));
        } else {
            return null;
        }
    });

export const selectCategoryById = (id: number) =>
    createSelector(this.selectAllCategories, (allCategories: ICategory[]) => {
        if (allCategories) {
            return allCategories.find(c => c.id === id);
        } else {
            return null;
        }
    });

export const selectCategoryError: MemoizedSelector<object, any> = createSelector(selectCategoryState, getError);

export const selectCategoryIsLoading: MemoizedSelector<object, boolean> = createSelector(selectCategoryState, getIsLoading);
