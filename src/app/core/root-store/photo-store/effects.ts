import { Injectable, Inject } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';

import * as photoActions from './actions';
import { photoApiServiceToken, PhotoApiService } from '../../services/photo-api.service';

@Injectable()
export class PhotoStoreEffects {
    constructor(
        @Inject(photoApiServiceToken) private _api: PhotoApiService,
        private _actions$: Actions
    ) {

    }

    @Effect()
    loadRequestEffect$: Observable<Action> = this._actions$.pipe(
        ofType<photoActions.LoadRequestAction>(photoActions.ActionTypes.LOAD_REQUEST),
        switchMap(action =>
            this._api.getPhotosByCategory(action.payload.categoryId)
                .pipe(
                    map(photos => new photoActions.LoadSuccessAction({ photos: photos })),
                    catchError(error => of(new photoActions.LoadFailureAction({ error })))
                )
        )
    );

    @Effect()
    loadRandomRequestEffect$: Observable<Action> = this._actions$.pipe(
        ofType<photoActions.LoadRandomRequestAction>(photoActions.ActionTypes.LOAD_RANDOM_REQUEST),
        switchMap(action =>
            this._api.getRandomPhoto()
                .pipe(
                    map(photo => new photoActions.LoadRandomSuccessAction({ photo: photo })),
                    catchError(error => of(new photoActions.LoadRandomFailureAction({ error: error })))
                )
        )
    );
}
