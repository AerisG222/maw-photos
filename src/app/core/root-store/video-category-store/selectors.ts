import {
    createFeatureSelector,
    createSelector,
    MemoizedSelector
} from '@ngrx/store';

import { VideoCategory } from 'src/app/core/models/video-category.model';
import { VIDEO_CATEGORY_FEATURE_NAME } from './feature-name';
import { VideoCategoryAdapter, State } from './state';

export const getError = (state: State): any => state.error;
export const getIsLoading = (state: State): boolean => state.isLoading;
export const getCurrentCategory = (state: State): VideoCategory => state.currentCategory;

export const selectVideoCategoryState: MemoizedSelector<object, State> = createFeatureSelector<State>(VIDEO_CATEGORY_FEATURE_NAME);

export const selectAllCategories: (state: object) => VideoCategory[] = VideoCategoryAdapter.getSelectors(selectVideoCategoryState).selectAll;

export const selectAllYears = () =>
    createSelector(selectAllCategories, (categories: VideoCategory[]) => {
        if (categories) {
            const allYears = categories.map(x => x.year);

            return Array.from(new Set(allYears));
        } else {
            return null;
        }
    });

export const selectCategoriesForYear = (year: number) =>
    createSelector(selectAllCategories, (categories: VideoCategory[]) => {
        if (categories) {
            return categories.filter(x => x.year === year);
        } else {
            return null;
        }
    });

export const selectCategoryById = (id: number) =>
    createSelector(selectAllCategories, (categories: VideoCategory[]) => {
        if (categories) {
            return categories.find(c => c.id === id);
        } else {
            return null;
        }
    });

export const selectVideoCategoryError: MemoizedSelector<object, any> = createSelector(selectVideoCategoryState, getError);
export const selectVideoCategoryIsLoading: MemoizedSelector<object, boolean> = createSelector(selectVideoCategoryState, getIsLoading);
export const selectCurrentCategory: MemoizedSelector<object, VideoCategory> = createSelector(selectVideoCategoryState, getCurrentCategory);
