import {
    createFeatureSelector,
    createSelector
} from '@ngrx/store';

import { Layout } from 'src/app/core/models/layout.model';
import { State } from './state';
import { LAYOUT_FEATURE_NAME } from './feature-name';

const getIsRightSidebarDisplayed = (state: State): boolean => state.layout.isRightNavDisplayed;
const getIsFullscreen = (state: State): boolean => state.layout.isFullscreen;
const getIsMobileView = (state: State): boolean => state.layout.isMobileView;
const getLayout = (state: State): Layout => state.layout;

export const selectLayoutState = createFeatureSelector<State>(LAYOUT_FEATURE_NAME);

// tslint:disable-next-line:max-line-length
export const selectLayoutIsRightSidebarDisplayed = createSelector(selectLayoutState, getIsRightSidebarDisplayed);
export const selectLayoutIsFullscreen = createSelector(selectLayoutState, getIsFullscreen);
export const selectLayoutIsMobileView = createSelector(selectLayoutState, getIsMobileView);
export const selectLayout = createSelector(selectLayoutState, getLayout);
