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

        case ActionTypes.TOGGLE_CATEGORY_LIST_CATEGORY_TITLES:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    categoryListShowCategoryTitles: !state.settings.categoryListShowCategoryTitles
                }
            };
        case ActionTypes.UPDATE_CATEGORY_LIST_THUMBNAIL_SIZE:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    categoryListThumbnailSize: action.payload.newSize
                }
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
        case ActionTypes.TOGGLE_PHOTO_INFO_PANEL_MINIMAP:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    photoInfoPanelShowMinimap: !state.settings.photoInfoPanelShowMinimap
                }
            };
        case ActionTypes.TOGGLE_PHOTO_INFO_PANEL_EXPANDED_STATE:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    photoInfoPanelExpandedState: !state.settings.photoInfoPanelExpandedState
                }
            };

        case ActionTypes.TOGGLE_PHOTO_LIST_SHOW_PHOTO_LIST:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    photoListShowPhotoList: !state.settings.photoListShowPhotoList
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
        case ActionTypes.TOGGLE_PHOTO_LIST_FULLSCREEN_TOOLBAR_EXPANDED_STATE:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    photoListFullscreenToolbarExpandedState: !state.settings.photoListFullscreenToolbarExpandedState
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
                    photoListShowCategoryBreadcrumbs: !state.settings.photoListShowCategoryBreadcrumbs
                }
            };

        case ActionTypes.TOGGLE_VIDEO_LIST_SHOW_VIDEO_LIST:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    videoListShowVideoList: !state.settings.videoListShowVideoList
                }
            };
        case ActionTypes.TOGGLE_VIDEO_LIST_TOOLBAR_EXPANDED_STATE:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    videoListToolbarExpandedState: !state.settings.videoListToolbarExpandedState
                }
            };
        case ActionTypes.UPDATE_VIDEO_LIST_THUMBNAIL_SIZE:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    videoListThumbnailSize: action.payload.newSize
                }
            };
        case ActionTypes.TOGGLE_VIDEO_LIST_CATEGORY_BREADCRUMBS:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    videoListShowCategoryBreadcrumbs: !state.settings.videoListShowCategoryBreadcrumbs
                }
            };
        case ActionTypes.UPDATE_VIDEO_LIST_VIDEO_SIZE:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    videoListVideoSize: action.payload.newSize
                }
            };

        case ActionTypes.TOGGLE_VIDEO_INFO_PANEL_COMMENTS:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    videoInfoPanelShowComments: !state.settings.videoInfoPanelShowComments
                }
            };
        case ActionTypes.TOGGLE_VIDEO_INFO_PANEL_RATINGS:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    videoInfoPanelShowRatings: !state.settings.videoInfoPanelShowRatings
                }
            };
        case ActionTypes.TOGGLE_VIDEO_INFO_PANEL_MINIMAP:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    videoInfoPanelShowMinimap: !state.settings.videoInfoPanelShowMinimap
                }
            };
        case ActionTypes.TOGGLE_VIDEO_INFO_PANEL_EXPANDED_STATE:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    videoInfoPanelExpandedState: !state.settings.videoInfoPanelExpandedState
                }
            };

        default: {
            return state;
        }
    }
}
