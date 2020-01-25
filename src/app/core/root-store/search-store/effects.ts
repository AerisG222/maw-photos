import { Injectable, Inject } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';

import * as SearchStoreActions from './actions';
import { searchApiServiceToken, SearchApiService } from '../../services/search-api.service';

@Injectable()
export class SearchStoreEffects {
    constructor(
        private actions$: Actions,
        @Inject(searchApiServiceToken) private api: SearchApiService,
    ) {

    }

    queryRequestEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SearchStoreActions.queryRequest),
            switchMap(action =>
                this.api.search(action.query)
                    .pipe(
                        map(result => SearchStoreActions.querySuccess({ result })),
                        catchError(error => of(SearchStoreActions.queryFailure({ error })))
                    )
            )
        )
    );
