import { Injectable, Inject } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs';
import { switchMap, catchError, map, withLatestFrom, filter } from 'rxjs/operators';

import * as VideoCategoryActions from './actions';
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

    loadRequestEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(VideoCategoryActions.loadRequest),
            withLatestFrom(this.store$.pipe(
                select(videoCategorySelectors.selectAllCategories)
            )),
            filter(([action, categories]) => categories.length === 0),
            switchMap(action =>
                this.api.getCategories()
                    .pipe(
                        map(cat => VideoCategoryActions.loadSuccess({ categories: cat.items })),
                        catchError(error => of(VideoCategoryActions.loadFailure({ error })))
                    )
            )
        )
    );
}
