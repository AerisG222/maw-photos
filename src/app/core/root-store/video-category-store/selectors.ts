import {
    createFeatureSelector,
    createSelector
} from '@ngrx/store';

import { VideoCategory } from 'src/app/core/models/video-category.model';
import { VIDEO_CATEGORY_FEATURE_NAME } from './feature-name';
import { VideoCategoryAdapter, State } from './state';

export const getError = (state: State): any => state.error;
export const getIsLoading = (state: State): boolean => state.isLoading;
export const getCurrentCategory = (state: State): VideoCategory => state.currentCategory;

export const selectVideoCategoryState = createFeatureSelector<State>(VIDEO_CATEGORY_FEATURE_NAME);

export const selectAllCategories = VideoCategoryAdapter.getSelectors(selectVideoCategoryState).selectAll;

export const selectAllYears =
    createSelector(selectAllCategories, (categories: VideoCategory[]) => {
        if (categories) {
            const allYears = categories.map(x => x.year);

            return Array.from(new Set(allYears));
        } else {
            return null;
        }
    });

export const selectCategoriesForYear =
    createSelector(selectAllCategories, (categories: VideoCategory[], props: { year: number }) => {
        if (categories) {
            return categories.filter(x => x.year === props.year);
        } else {
            return null;
        }
    });

export const selectCategoryById =
    createSelector(selectAllCategories, (categories: VideoCategory[], props: { id: number }) => {
        if (categories) {
            return categories.find(c => c.id === props.id);
        } else {
            return null;
        }
    });

export const selectVideoCategoryError = createSelector(selectVideoCategoryState, getError);
export const selectVideoCategoryIsLoading = createSelector(selectVideoCategoryState, getIsLoading);
export const selectCurrentCategory = createSelector(selectVideoCategoryState, getCurrentCategory);
