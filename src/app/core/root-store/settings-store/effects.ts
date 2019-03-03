import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { startWith, map, withLatestFrom } from 'rxjs/operators';

import { SettingsService } from 'src/app/core/services/settings.service';
import * as settingsActions from './actions';
import * as settingsSelectors from './selectors';
import { State } from './state';

@Injectable()
export class SettingsStoreEffects {
    constructor(
        private _settingsService: SettingsService,
        private _actions$: Actions,
        private _store$: Store<State>
    ) {

    }

    @Effect()
    loadRequestEffect$: Observable<Action> = this._actions$.pipe(
        ofType<settingsActions.LoadRequestAction>(settingsActions.ActionTypes.LOAD_REQUEST),
        startWith(new settingsActions.LoadRequestAction()),
        map(x => {
            const settings = this._settingsService.load();
            return new settingsActions.LoadSuccessAction({ settings });
        })
    );

    @Effect()
    saveRequestEffect$: Observable<Action> = this._actions$.pipe(
        ofType<settingsActions.SaveRequestAction>(settingsActions.ActionTypes.SAVE_REQUEST),
        map(action => {
            try {
                this._settingsService.save(action.payload.settings);
                return new settingsActions.SaveSuccessAction(action.payload);
            } catch (err) {
                return new settingsActions.SaveFailureAction(err);
            }
        })
    );

    @Effect()
    togglePhotoInfoPanelComments$: Observable<Action> = this._actions$.pipe(
        ofType<settingsActions.TogglePhotoInfoPanelCommentsRequestAction>(settingsActions.ActionTypes.TOGGLE_PHOTO_INFO_PANEL_COMMENTS),
        withLatestFrom(this._store$.pipe(
            select(settingsSelectors.selectSettings)
        )),
        map(x => {
            return new settingsActions.SaveRequestAction({ settings: x[1] });
        })
    );

    @Effect()
    togglePhotoInfoPanelEffects$: Observable<Action> = this._actions$.pipe(
        ofType<settingsActions.TogglePhotoInfoPanelEffectsRequestAction>(settingsActions.ActionTypes.TOGGLE_PHOTO_INFO_PANEL_EFFECTS),
        withLatestFrom(this._store$.pipe(
            select(settingsSelectors.selectSettings)
        )),
        map(x => {
            return new settingsActions.SaveRequestAction({ settings: x[1] });
        })
    );

    @Effect()
    togglePhotoInfoPanelExif$: Observable<Action> = this._actions$.pipe(
        ofType<settingsActions.TogglePhotoInfoPanelExifRequestAction>(settingsActions.ActionTypes.TOGGLE_PHOTO_INFO_PANEL_EXIF),
        withLatestFrom(this._store$.pipe(
            select(settingsSelectors.selectSettings)
        )),
        map(x => {
            return new settingsActions.SaveRequestAction({ settings: x[1] });
        })
    );

    @Effect()
    togglePhotoInfoPanelRatings$: Observable<Action> = this._actions$.pipe(
        ofType<settingsActions.TogglePhotoInfoPanelRatingsRequestAction>(settingsActions.ActionTypes.TOGGLE_PHOTO_INFO_PANEL_RATINGS),
        withLatestFrom(this._store$.pipe(
            select(settingsSelectors.selectSettings)
        )),
        map(x => {
            return new settingsActions.SaveRequestAction({ settings: x[1] });
        })
    );

    @Effect()
    togglePhotoInfoPanelMinimap$: Observable<Action> = this._actions$.pipe(
        // tslint:disable-next-line:max-line-length
        ofType<settingsActions.TogglePhotoInfoPanelMinimapRequestAction>(settingsActions.ActionTypes.TOGGLE_PHOTO_INFO_PANEL_MINIMAP),
        withLatestFrom(this._store$.pipe(
            select(settingsSelectors.selectSettings)
        )),
        map(x => {
            return new settingsActions.SaveRequestAction({ settings: x[1] });
        })
    );

    @Effect()
    togglePhotoInfoPanelExpandedState$: Observable<Action> = this._actions$.pipe(
        // tslint:disable-next-line:max-line-length
        ofType<settingsActions.TogglePhotoInfoPanelExpandedStateRequestAction>(settingsActions.ActionTypes.TOGGLE_PHOTO_INFO_PANEL_EXPANDED_STATE),
        withLatestFrom(this._store$.pipe(
            select(settingsSelectors.selectSettings)
        )),
        map(x => {
            return new settingsActions.SaveRequestAction({ settings: x[1] });
        })
    );

    @Effect()
    togglePhotoListToolbarExpandedState$: Observable<Action> = this._actions$.pipe(
        // tslint:disable-next-line:max-line-length
        ofType<settingsActions.TogglePhotoListToolbarExpandedStateRequestAction>(settingsActions.ActionTypes.TOGGLE_PHOTO_LIST_TOOLBAR_EXPANDED_STATE),
        withLatestFrom(this._store$.pipe(
            select(settingsSelectors.selectSettings)
        )),
        map(x => {
            return new settingsActions.SaveRequestAction({ settings: x[1] });
        })
    );

    @Effect()
    togglePhotoListFullscreenToolbarExpandedState$: Observable<Action> = this._actions$.pipe(
        // tslint:disable-next-line:max-line-length
        ofType<settingsActions.TogglePhotoListFullscreenToolbarExpandedStateRequestAction>(settingsActions.ActionTypes.TOGGLE_PHOTO_LIST_FULLSCREEN_TOOLBAR_EXPANDED_STATE),
        withLatestFrom(this._store$.pipe(
            select(settingsSelectors.selectSettings)
        )),
        map(x => {
            return new settingsActions.SaveRequestAction({ settings: x[1] });
        })
    );

    @Effect()
    togglePhotoListShowPhotoList$: Observable<Action> = this._actions$.pipe(
        // tslint:disable-next-line:max-line-length
        ofType<settingsActions.TogglePhotoListShowPhotoListRequestAction>(settingsActions.ActionTypes.TOGGLE_PHOTO_LIST_SHOW_PHOTO_LIST),
        withLatestFrom(this._store$.pipe(
            select(settingsSelectors.selectSettings)
        )),
        map(x => {
            return new settingsActions.SaveRequestAction({ settings: x[1] });
        })
    );

    @Effect()
    updatePhotoListThumbnailSize$: Observable<Action> = this._actions$.pipe(
        // tslint:disable-next-line:max-line-length
        ofType<settingsActions.UpdatePhotoListThumbnailSizeRequestAction>(settingsActions.ActionTypes.UPDATE_PHOTO_LIST_THUMBNAIL_SIZE),
        withLatestFrom(this._store$.pipe(
            select(settingsSelectors.selectSettings)
        )),
        map(x => {
            return new settingsActions.SaveRequestAction({ settings: x[1] });
        })
    );

    @Effect()
    togglePhotoListCategoryBreadcrumbs$: Observable<Action> = this._actions$.pipe(
        // tslint:disable-next-line:max-line-length
        ofType<settingsActions.TogglePhotoListCategoryBreadcrumbsRequestAction>(settingsActions.ActionTypes.TOGGLE_PHOTO_LIST_CATEGORY_BREADCRUMBS),
        withLatestFrom(this._store$.pipe(
            select(settingsSelectors.selectSettings)
        )),
        map(x => {
            return new settingsActions.SaveRequestAction({ settings: x[1] });
        })
    );

    @Effect()
    toggleCategoryListCategoryTitles$: Observable<Action> = this._actions$.pipe(
        // tslint:disable-next-line:max-line-length
        ofType<settingsActions.ToggleCategoryListCategoryTitlesRequestAction>(settingsActions.ActionTypes.TOGGLE_CATEGORY_LIST_CATEGORY_TITLES),
        withLatestFrom(this._store$.pipe(
            select(settingsSelectors.selectSettings)
        )),
        map(x => {
            return new settingsActions.SaveRequestAction({ settings: x[1] });
        })
    );

    @Effect()
    updateCategoryListThumbnailSize$: Observable<Action> = this._actions$.pipe(
        // tslint:disable-next-line:max-line-length
        ofType<settingsActions.UpdateCategoryListThumbnailSizeRequestAction>(settingsActions.ActionTypes.UPDATE_CATEGORY_LIST_THUMBNAIL_SIZE),
        withLatestFrom(this._store$.pipe(
            select(settingsSelectors.selectSettings)
        )),
        map(x => {
            return new settingsActions.SaveRequestAction({ settings: x[1] });
        })
    );

    @Effect()
    toggleVideoListShowVideoList$: Observable<Action> = this._actions$.pipe(
        // tslint:disable-next-line:max-line-length
        ofType<settingsActions.ToggleVideoListShowVideoListRequestAction>(settingsActions.ActionTypes.TOGGLE_VIDEO_LIST_SHOW_VIDEO_LIST),
        withLatestFrom(this._store$.pipe(
            select(settingsSelectors.selectSettings)
        )),
        map(x => {
            return new settingsActions.SaveRequestAction({ settings: x[1] });
        })
    );

    @Effect()
    toggleVideoListToolbarExpandedState$: Observable<Action> = this._actions$.pipe(
        // tslint:disable-next-line:max-line-length
        ofType<settingsActions.ToggleVideoListToolbarExpandedStateRequestAction>(settingsActions.ActionTypes.TOGGLE_VIDEO_LIST_TOOLBAR_EXPANDED_STATE),
        withLatestFrom(this._store$.pipe(
            select(settingsSelectors.selectSettings)
        )),
        map(x => {
            return new settingsActions.SaveRequestAction({ settings: x[1] });
        })
    );

    @Effect()
    updateVideoListThumbnailSize$: Observable<Action> = this._actions$.pipe(
        // tslint:disable-next-line:max-line-length
        ofType<settingsActions.UpdateVideoListThumbnailSizeRequestAction>(settingsActions.ActionTypes.UPDATE_VIDEO_LIST_THUMBNAIL_SIZE),
        withLatestFrom(this._store$.pipe(
            select(settingsSelectors.selectSettings)
        )),
        map(x => {
            return new settingsActions.SaveRequestAction({ settings: x[1] });
        })
    );

    @Effect()
    toggleVideoListCategoryBreadcrumbs$: Observable<Action> = this._actions$.pipe(
        // tslint:disable-next-line:max-line-length
        ofType<settingsActions.ToggleVideoListCategoryBreadcrumbsRequestAction>(settingsActions.ActionTypes.TOGGLE_VIDEO_LIST_CATEGORY_BREADCRUMBS),
        withLatestFrom(this._store$.pipe(
            select(settingsSelectors.selectSettings)
        )),
        map(x => {
            return new settingsActions.SaveRequestAction({ settings: x[1] });
        })
    );

    @Effect()
    updateVideoListVideoSize$: Observable<Action> = this._actions$.pipe(
        // tslint:disable-next-line:max-line-length
        ofType<settingsActions.UpdateVideoListVideoSizeRequestAction>(settingsActions.ActionTypes.UPDATE_VIDEO_LIST_VIDEO_SIZE),
        withLatestFrom(this._store$.pipe(
            select(settingsSelectors.selectSettings)
        )),
        map(x => {
            return new settingsActions.SaveRequestAction({ settings: x[1] });
        })
    );

    @Effect()
    toggleVideoInfoPanelComments$: Observable<Action> = this._actions$.pipe(
        ofType<settingsActions.ToggleVideoInfoPanelCommentsRequestAction>(settingsActions.ActionTypes.TOGGLE_VIDEO_INFO_PANEL_COMMENTS),
        withLatestFrom(this._store$.pipe(
            select(settingsSelectors.selectSettings)
        )),
        map(x => {
            return new settingsActions.SaveRequestAction({ settings: x[1] });
        })
    );

    @Effect()
    toggleVideoInfoPanelRatings$: Observable<Action> = this._actions$.pipe(
        ofType<settingsActions.ToggleVideoInfoPanelRatingsRequestAction>(settingsActions.ActionTypes.TOGGLE_VIDEO_INFO_PANEL_RATINGS),
        withLatestFrom(this._store$.pipe(
            select(settingsSelectors.selectSettings)
        )),
        map(x => {
            return new settingsActions.SaveRequestAction({ settings: x[1] });
        })
    );

    @Effect()
    toggleVideoInfoPanelMinimap$: Observable<Action> = this._actions$.pipe(
        // tslint:disable-next-line:max-line-length
        ofType<settingsActions.ToggleVideoInfoPanelMinimapRequestAction>(settingsActions.ActionTypes.TOGGLE_VIDEO_INFO_PANEL_MINIMAP),
        withLatestFrom(this._store$.pipe(
            select(settingsSelectors.selectSettings)
        )),
        map(x => {
            return new settingsActions.SaveRequestAction({ settings: x[1] });
        })
    );

    @Effect()
    toggleVideoInfoPanelExpandedState$: Observable<Action> = this._actions$.pipe(
        // tslint:disable-next-line:max-line-length
        ofType<settingsActions.ToggleVideoInfoPanelExpandedStateRequestAction>(settingsActions.ActionTypes.TOGGLE_VIDEO_INFO_PANEL_EXPANDED_STATE),
        withLatestFrom(this._store$.pipe(
            select(settingsSelectors.selectSettings)
        )),
        map(x => {
            return new settingsActions.SaveRequestAction({ settings: x[1] });
        })
    );
}
