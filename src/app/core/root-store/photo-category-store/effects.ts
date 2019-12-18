import { Injectable, Inject } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs';
import { switchMap, catchError, map, withLatestFrom, filter } from 'rxjs/operators';

import * as PhotoCategoryActions from './actions';
import * as PhotoCategorySelectors from './selectors';
import { photoApiServiceToken, PhotoApiService } from 'src/app/core/services/photo-api.service';

@Injectable()
export class PhotoCategoryStoreEffects {
    constructor(
        @Inject(photoApiServiceToken) private api: PhotoApiService,
        private actions$: Actions,
        private store$: Store<{}>
    ) {

    }

    loadRequestEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PhotoCategoryActions.loadRequest),
            withLatestFrom(this.store$.pipe(
                select(PhotoCategorySelectors.selectAllCategories)
            )),
            filter(([action, categories]) => categories.length === 0),
            switchMap(action =>
                this.api.getCategories()
                    .pipe(
                        map(cat => PhotoCategoryActions.loadSuccess({ categories: cat.items })),
                        catchError(error => of(PhotoCategoryActions.loadFailure({ error })))
                    )
            )
        )
    );
}
