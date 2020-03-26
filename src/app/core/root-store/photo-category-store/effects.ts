import { Injectable, Inject } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs';
import { switchMap, catchError, map, withLatestFrom, filter, concatMap } from 'rxjs/operators';

import * as PhotoCategoryActions from './actions';
import * as PhotoCategorySelectors from './selectors';
import { photoApiServiceToken, PhotoApiService } from 'src/app/core/services/photo-api.service';

@Injectable()
export class PhotoCategoryStoreEffects {
    constructor(
        @Inject(photoApiServiceToken) private api: PhotoApiService,
        private actions$: Actions,
        private store$: Store
    ) {

    }

    loadRequestEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PhotoCategoryActions.loadRequest),
            withLatestFrom(this.store$.pipe(
                select(PhotoCategorySelectors.selectAllCategories)
            )),
            switchMap(([action, categories]) => {
                if(categories.length !== 0) {
                    return of(PhotoCategoryActions.loadRequestedSatisfiedByCache())
                }

                return this.api.getCategories()
                    .pipe(
                        map(cat => PhotoCategoryActions.loadSuccess({ categories: cat.items })),
                        catchError(error => of(PhotoCategoryActions.loadFailure({ error })))
                    )
            })
        )
    );

    setTeaserEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PhotoCategoryActions.setTeaserRequest),
            concatMap(action =>
                this.api.setTeaser(action.categoryId, action.photoId)
                    .pipe(
                        map(category => PhotoCategoryActions.setTeaserSuccess({ category })),
                        catchError(error => of(PhotoCategoryActions.setTeaserFailure({ error })))
                    )
            )
        )
    );
}
