import {
    createFeatureSelector,
    createSelector,
    MemoizedSelector
} from '@ngrx/store';

import { State } from './state';
import { LAYOUT_FEATURE_NAME } from './feature-name';
import { Layout } from '../../models/layout.model';

const getIsRightSidebarDisplayed = (state: State): boolean => state.layout.isRightNavDisplayed;
const getIsFullscreen = (state: State): boolean => state.layout.isFullscreen;
const getLayout = (state: State): Layout => state.layout;

export const selectLayoutState: MemoizedSelector<object, State> = createFeatureSelector<State>(LAYOUT_FEATURE_NAME);

// tslint:disable-next-line:max-line-length
export const selectLayoutIsRightSidebarDisplayed: MemoizedSelector<object, boolean> = createSelector(selectLayoutState, getIsRightSidebarDisplayed);
export const selectLayoutIsFullscreen: MemoizedSelector<object, boolean> = createSelector(selectLayoutState, getIsFullscreen);
export const selectLayout: MemoizedSelector<object, Layout> = createSelector(selectLayoutState, getLayout);
