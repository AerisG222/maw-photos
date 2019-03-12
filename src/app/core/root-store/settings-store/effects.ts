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
    propertyChangeTriggersSaveEffect$: Observable<Action> = this._actions$.pipe(
        ofType(
            settingsActions.ActionTypes.TOGGLE_CATEGORY_LIST_CATEGORY_TITLES,
            settingsActions.ActionTypes.UPDATE_CATEGORY_LIST_THUMBNAIL_SIZE,

            settingsActions.ActionTypes.TOGGLE_PHOTO_INFO_PANEL_COMMENTS,
            settingsActions.ActionTypes.TOGGLE_PHOTO_INFO_PANEL_EFFECTS,
            settingsActions.ActionTypes.TOGGLE_PHOTO_INFO_PANEL_EXIF,
            settingsActions.ActionTypes.TOGGLE_PHOTO_INFO_PANEL_EXPANDED_STATE,
            settingsActions.ActionTypes.TOGGLE_PHOTO_INFO_PANEL_HISTOGRAM,
            settingsActions.ActionTypes.TOGGLE_PHOTO_INFO_PANEL_MINIMAP,
            settingsActions.ActionTypes.UPDATE_PHOTO_INFO_PANEL_MINIMAP_ZOOM,
            settingsActions.ActionTypes.TOGGLE_PHOTO_INFO_PANEL_RATINGS,

            settingsActions.ActionTypes.TOGGLE_PHOTO_LIST_CATEGORY_BREADCRUMBS,
            settingsActions.ActionTypes.TOGGLE_PHOTO_LIST_FULLSCREEN_TOOLBAR_EXPANDED_STATE,
            settingsActions.ActionTypes.UPDATE_PHOTO_LIST_MAP_VIEW_ZOOM,
            settingsActions.ActionTypes.TOGGLE_PHOTO_LIST_SHOW_PHOTO_LIST,
            settingsActions.ActionTypes.UPDATE_PHOTO_LIST_THUMBNAIL_SIZE,
            settingsActions.ActionTypes.TOGGLE_PHOTO_LIST_TOOLBAR_EXPANDED_STATE,

            settingsActions.ActionTypes.TOGGLE_VIDEO_LIST_CATEGORY_BREADCRUMBS,
            settingsActions.ActionTypes.TOGGLE_VIDEO_LIST_SHOW_VIDEO_LIST,
            settingsActions.ActionTypes.UPDATE_VIDEO_LIST_THUMBNAIL_SIZE,
            settingsActions.ActionTypes.TOGGLE_VIDEO_LIST_TOOLBAR_EXPANDED_STATE,
            settingsActions.ActionTypes.UPDATE_VIDEO_LIST_VIDEO_SIZE,

            settingsActions.ActionTypes.TOGGLE_VIDEO_INFO_PANEL_COMMENTS,
            settingsActions.ActionTypes.TOGGLE_VIDEO_INFO_PANEL_EXPANDED_STATE,
            settingsActions.ActionTypes.TOGGLE_VIDEO_INFO_PANEL_MINIMAP,
            settingsActions.ActionTypes.UPDATE_VIDEO_INFO_PANEL_MINIMAP_ZOOM,
            settingsActions.ActionTypes.TOGGLE_VIDEO_INFO_PANEL_RATINGS
        ),
        withLatestFrom(this._store$.pipe(
            select(settingsSelectors.selectSettings)
        )),
        map(x => {
            return new settingsActions.SaveRequestAction({ settings: x[1] });
        })
    );
}
