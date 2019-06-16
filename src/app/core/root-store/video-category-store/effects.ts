import { Injectable, Inject } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap, catchError, map, withLatestFrom, filter } from 'rxjs/operators';

import * as videoCategoryActions from './actions';
import * as videoCategorySelectors from './selectors';
import { videoApiServiceToken, VideoApiService } from 'src/app/core/services/video-api.service';
import { State } from './state';

@Injectable()
export class VideoCategoryStoreEffects {
    constructor(
        @Inject(videoApiServiceToken) private api: VideoApiService,
        private actions$: Actions,
        private store$: Store<State>
    ) {

    }

    @Effect()
    loadRequestEffect$: Observable<Action> = this.actions$.pipe(
        ofType<videoCategoryActions.LoadRequestAction>(videoCategoryActions.ActionTypes.LOAD_REQUEST),
        withLatestFrom(this.store$.pipe(
            select(videoCategorySelectors.selectAllCategories)
        )),
        filter(([action, categories]) => categories.length === 0),
        switchMap(action =>
            this.api.getCategories()
                .pipe(
                    map(cat => new videoCategoryActions.LoadSuccessAction({ categories: cat.items })),
                    catchError(error => of(new videoCategoryActions.LoadFailureAction({ error })))
                )
        )
    );
}
