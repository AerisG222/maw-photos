import {
    createFeatureSelector,
    createSelector
} from '@ngrx/store';

import { Layout } from 'src/app/core/models/layout.model';
import { State } from './state';
import { LAYOUT_FEATURE_NAME } from './feature-name';

const getIsFullscreen = (state: State): boolean => state.layout.isFullscreen;
const getLayout = (state: State): Layout => state.layout;

export const selectLayoutState = createFeatureSelector<State>(LAYOUT_FEATURE_NAME);

export const selectLayoutIsFullscreen = createSelector(selectLayoutState, getIsFullscreen);
export const selectLayout = createSelector(selectLayoutState, getLayout);
