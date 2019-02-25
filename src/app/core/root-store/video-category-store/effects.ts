import { Injectable, Inject } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { startWith, switchMap, catchError, map } from 'rxjs/operators';

import * as videoCategoryActions from './actions';
import { videoApiServiceToken, VideoApiService } from 'src/app/core/services/video-api.service';

@Injectable()
export class VideoCategoryStoreEffects {
    constructor(
        @Inject(videoApiServiceToken) private _api: VideoApiService,
        private _actions$: Actions
    ) {

    }

    @Effect()
    loadRequestEffect$: Observable<Action> = this._actions$.pipe(
        ofType<videoCategoryActions.LoadRequestAction>(videoCategoryActions.ActionTypes.LOAD_REQUEST),
        startWith(new videoCategoryActions.LoadRequestAction()),
        switchMap(action =>
            this._api.getCategories()
                .pipe(
                    map(cat => new videoCategoryActions.LoadSuccessAction({ categories: cat })),
                    catchError(error => of(new videoCategoryActions.LoadFailureAction({ error })))
                )
        )
    );
}
