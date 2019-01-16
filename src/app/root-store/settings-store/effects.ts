import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap, startWith, map } from 'rxjs/operators';

import { SettingsService } from '../../services/settings.service';
import * as settingsActions from './actions';

@Injectable()
export class SettingsStoreEffects {
    constructor(
        private _settingsService: SettingsService,
        private _actions$: Actions
    ) {

    }

    @Effect()
    loadRequestEffect$: Observable<Action> = this._actions$.pipe(
        ofType<settingsActions.LoadRequestAction>(settingsActions.ActionTypes.LOAD_REQUEST),
        startWith(new settingsActions.LoadRequestAction()),
        switchMap(action => {
            const settings = this._settingsService.load();

            return of(new settingsActions.LoadSuccessAction({ settings }));
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
}
