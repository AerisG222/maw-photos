import { Actions, ActionTypes } from './actions';
import { initialState, State } from './state';

export function layoutReducer(state = initialState, action: Actions): State {
    switch (action.type) {
        case ActionTypes.INITIALIZE_REQUEST:
            return state;
        case ActionTypes.INITIALIZE_COMPLETED:
            return {
                ...state,
                layout: {
                    ...state.layout,
                    isMobileView: action.payload.isMobileView
                }
            };
        case ActionTypes.MEDIA_QUERY_UPDATED:
            return {
                ...state,
                layout: {
                    ...state.layout,
                    isMobileView: action.payload.isMobileView
                }
            };

        case ActionTypes.RESET_LAYOUT_REQUEST:
            return {
                ...state,
                layout: {
                    ...state.layout,
                    isRightNavDisplayed: false
                }
            };
        case ActionTypes.OPEN_RIGHT_SIDEBAR_REQUEST:
            return {
                ...state,
                layout: {
                    ...state.layout,
                    isRightNavDisplayed: true
                }
            };
        case ActionTypes.CLOSE_RIGHT_SIDEBAR_REQUEST:
            return {
                ...state,
                layout: {
                    ...state.layout,
                    isRightNavDisplayed: false
                }
            };
        case ActionTypes.TOGGLE_FULLSCREEN_REQUEST:
            return {
                ...state,
                layout: {
                    ...state.layout,
                    isFullscreen: !state.layout.isFullscreen
                }
            };
        case ActionTypes.ENTER_FULLSCREEN_REQUEST:
            return {
                ...state,
                layout: {
                    ...state.layout,
                    isFullscreen: true
                }
            };
        case ActionTypes.EXIT_FULLSCREEN_REQUEST:
            return {
                ...state,
                layout: {
                    ...state.layout,
                    isFullscreen: false
                }
            };
        default: {
            return state;
        }
    }
}
