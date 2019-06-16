import { Injectable, Inject } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, select, Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap, catchError, map, withLatestFrom, filter } from 'rxjs/operators';

import * as photoCategoryActions from './actions';
import * as photoCategorySelectors from './selectors';
import { State } from './state';
import { photoApiServiceToken, PhotoApiService } from 'src/app/core/services/photo-api.service';

@Injectable()
export class PhotoCategoryStoreEffects {
    constructor(
        @Inject(photoApiServiceToken) private api: PhotoApiService,
        private actions$: Actions,
        private store$: Store<State>
    ) {

    }

    @Effect()
    loadRequestEffect$: Observable<Action> = this.actions$.pipe(
        ofType<photoCategoryActions.LoadRequestAction>(photoCategoryActions.ActionTypes.LOAD_REQUEST),
        withLatestFrom(this.store$.pipe(
            select(photoCategorySelectors.selectAllCategories)
        )),
        filter(([action, categories]) => categories.length === 0),
        switchMap(action => {
            return this.api.getCategories()
                .pipe(
                    map(cat => new photoCategoryActions.LoadSuccessAction({ categories: cat.items })),
                    catchError(error => of(new photoCategoryActions.LoadFailureAction({ error })))
                );
        })
    );
}
