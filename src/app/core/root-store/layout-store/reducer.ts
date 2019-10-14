import { on, createReducer } from '@ngrx/store';

import * as LayoutActions from './actions';
import { initialState } from './state';

export const layoutReducer = createReducer(
    initialState,
    on(LayoutActions.resetLayoutRequest, state => ({
        ...state,
        layout: {
            ...state.layout,
            isRightNavDisplayed: false
        }
    })),
    on(LayoutActions.openRightSidebarRequest, state => ({
        ...state,
        layout: {
            ...state.layout,
            isRightNavDisplayed: true
        }
    })),
    on(LayoutActions.closeRightSidebarRequest, state => ({
        ...state,
        layout: {
            ...state.layout,
            isRightNavDisplayed: false
        }
    })),
    on(LayoutActions.toggleFullscreenRequest, state => ({
        ...state,
        layout: {
            ...state.layout,
            isFullscreen: !state.layout.isFullscreen
        }
    })),
    on(LayoutActions.enterFullscreenRequest, state => ({
        ...state,
        layout: {
            ...state.layout,
            isFullscreen: true
        }
    })),
    on(LayoutActions.exitFullscreenRequest, state => ({
        ...state,
        layout: {
            ...state.layout,
            isFullscreen: false
        }
    }))
);

/*
export function reducer(state: State | undefined, action: Action) {
    return layoutReducer(state, action);
}
*/
