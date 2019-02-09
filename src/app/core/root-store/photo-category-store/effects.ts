import { Injectable, Inject } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of, from } from 'rxjs';
import { startWith, switchMap, catchError, flatMap, mergeMap, map } from 'rxjs/operators';

import * as photoCategoryActions from './actions';
import { photoApiServiceToken, PhotoApiService } from 'src/app/core/services/photo-api.service';

@Injectable()
export class PhotoCategoryStoreEffects {
    constructor(
        @Inject(photoApiServiceToken) private _api: PhotoApiService,
        private _actions$: Actions
    ) {

    }

    @Effect()
    loadRequestEffect$: Observable<Action> = this._actions$.pipe(
        ofType<photoCategoryActions.LoadRequestAction>(photoCategoryActions.ActionTypes.LOAD_REQUEST),
        startWith(new photoCategoryActions.LoadRequestAction()),
        switchMap(action =>
            this._api.getYears()
                .pipe(
                    flatMap(years => from(years)),
                    mergeMap(year => this._api.getCategoriesForYear(year)),
                    map(cat => new photoCategoryActions.LoadSuccessAction({ categories: cat })),
                    catchError(error => of(new photoCategoryActions.LoadFailureAction({ error })))
                )
        )
    );
}
