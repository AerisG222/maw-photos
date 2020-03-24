import { on, createReducer, Action } from '@ngrx/store';

import * as LayoutActions from './actions';
import { initialState, State } from './state';

const reducer = createReducer(
    initialState,
    on(LayoutActions.resetLayoutRequest, state => ({
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

export function layoutReducer(state: State | undefined, action: Action) {
    return reducer(state, action);
}
