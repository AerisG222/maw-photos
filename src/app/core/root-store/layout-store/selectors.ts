import { createFeatureSelector, createSelector } from '@ngrx/store';

import { Layout } from 'src/app/models/layout.model';
import { State } from './state';
import { LAYOUT_FEATURE_NAME } from './feature-name';

export const layoutState = createFeatureSelector<State>(LAYOUT_FEATURE_NAME);

export const selectLayoutIsFullscreen = createSelector(
    layoutState,
    (state: State): boolean => state.layout.isFullscreen
);

export const selectLayout = createSelector(
    layoutState,
    (state: State): Layout => state.layout
);
