import { on, createReducer } from '@ngrx/store';

import * as LayoutActions from './actions';
import { initialState, State } from './state';

export const reducer = createReducer(
    initialState,
    on(LayoutActions.enterFullscreenRequest, (state): State => ({
        ...state,
        layout: {
            ...state.layout,
            isFullscreen: true
        }
    })),
    on(LayoutActions.exitFullscreenRequest, (state): State => ({
        ...state,
        layout: {
            ...state.layout,
            isFullscreen: false
        }
    }))
);
