import { createFeatureSelector, createSelector } from '@ngrx/store';

import { State } from './state';
import { LAYOUT_FEATURE_NAME } from './feature-name';

const layoutState = createFeatureSelector<State>(LAYOUT_FEATURE_NAME);

export const isFullscreen = createSelector(
    layoutState,
    (state: State): boolean => state.layout.isFullscreen
);
