import { Injectable, Inject } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs';
import { switchMap, catchError, map, withLatestFrom, filter, concatMap } from 'rxjs/operators';

import * as VideoCategoryActions from './actions';
import * as videoCategorySelectors from './selectors';
import { videoApiServiceToken, VideoApiService } from 'src/app/core/services/video-api.service';

@Injectable()
export class VideoCategoryStoreEffects {
    constructor(
        @Inject(videoApiServiceToken) private api: VideoApiService,
        private actions$: Actions,
        private store$: Store
    ) {

    }

    loadRequestEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(VideoCategoryActions.loadRequest),
            withLatestFrom(this.store$.pipe(
                select(videoCategorySelectors.selectAllCategories)
            )),
            switchMap(([action, categories]) => {
                if(categories.length !== 0) {
                    return of(VideoCategoryActions.loadRequestedSatisfiedByCache())
                }

                return this.api.getCategories()
                    .pipe(
                        map(cat => VideoCategoryActions.loadSuccess({ categories: cat.items })),
                        catchError(error => of(VideoCategoryActions.loadFailure({ error })))
                    )
            })
        )
    );

    setTeaserEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(VideoCategoryActions.setTeaserRequest),
            concatMap(action =>
                this.api.setTeaser(action.categoryId, action.videoId)
                    .pipe(
                        map(category => VideoCategoryActions.setTeaserSuccess({ category })),
                        catchError(error => of(VideoCategoryActions.setTeaserFailure({ error })))
                    )
            )
        )
    );
}
