import { Actions, ActionTypes } from './actions';
import { initialState, State } from './state';

export function settingsReducer(state = initialState, action: Actions): State {
    switch (action.type) {
        case ActionTypes.LOAD_REQUEST:
            return {
                ...state,
                error: null,
                isLoading: true
            };
        case ActionTypes.LOAD_SUCCESS:
            return {
                ...state,
                settings: { ...action.payload.settings },
                error: null,
                isLoading: false
            };
        case ActionTypes.LOAD_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                isLoading: false
            };
        case ActionTypes.SAVE_REQUEST:
            return {
                ...state,
                error: null
            };
        case ActionTypes.SAVE_FAILURE:
            return {
                ...state,
                error: action.payload.error
            };
        case ActionTypes.SAVE_SUCCESS:
            return {
                ...state,
                settings: { ...action.payload.settings },
                error: null
            };
            case ActionTypes.TOGGLE_PHOTO_INFO_PANEL_COMMENTS:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    photoInfoPanelShowComments: !state.settings.photoInfoPanelShowComments
                }
            };
        case ActionTypes.TOGGLE_PHOTO_INFO_PANEL_EFFECTS:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    photoInfoPanelShowEffects: !state.settings.photoInfoPanelShowEffects
                }
            };
        case ActionTypes.TOGGLE_PHOTO_INFO_PANEL_EXIF:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    photoInfoPanelShowExif: !state.settings.photoInfoPanelShowExif
                }
            };
        case ActionTypes.TOGGLE_PHOTO_INFO_PANEL_RATINGS:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    photoInfoPanelShowRatings: !state.settings.photoInfoPanelShowRatings
                }
            };
        case ActionTypes.TOGGLE_PHOTO_LIST_TOOLBAR_EXPANDED_STATE:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    photoListToolbarExpandedState: !state.settings.photoListToolbarExpandedState
                }
            };
        case ActionTypes.UPDATE_PHOTO_LIST_THUMBNAIL_SIZE:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    photoListThumbnailSize: action.payload.newSize
                }
            };
        case ActionTypes.TOGGLE_PHOTO_LIST_CATEGORY_BREADCRUMBS:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    showCategoryBreadcrumbs: !state.settings.showCategoryBreadcrumbs
                }
            };
        case ActionTypes.TOGGLE_CATEGORY_LIST_CATEGORY_TITLES:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    showCategoryTitles: !state.settings.showCategoryTitles
                }
            };
        case ActionTypes.UPDATE_CATEGORY_LIST_THUMBNAIL_SIZE:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    categoryThumbnailSize: action.payload.newSize
                }
            };
        case ActionTypes.TOGGLE_PHOTO_INFO_PANEL_MINIMAP:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    photoInfoPanelShowMinimap: !state.settings.photoInfoPanelShowMinimap
                }
            };
        default: {
            return state;
        }
    }
}
