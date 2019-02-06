import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { startWith, map, withLatestFrom } from 'rxjs/operators';

import { SettingsService } from '../../services/settings.service';
import * as settingsActions from './actions';
import { State } from './state';
import * as settingsSelectors from './selectors';

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
}
