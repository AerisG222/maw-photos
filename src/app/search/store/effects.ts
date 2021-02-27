import { Injectable, Inject } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import {
    switchMap,
    catchError,
    map,
    withLatestFrom,
    filter,
} from 'rxjs/operators';

import * as SearchActions from './actions';
import * as searchSelectors from './selectors';
import {
    searchApiServiceToken,
    SearchApiService,
} from 'src/app/search/services/search-api.service';
import { httpErrorHandler } from '@models';

@Injectable()
export class SearchStoreEffects {
    queryRequestEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(SearchActions.queryRequest),
            withLatestFrom(this.store.select(searchSelectors.query)),
            filter(([action, activeQueryTerm]) => activeQueryTerm !== action.query),
            switchMap(([action,]) =>
                this.api.search(action.query, action.start).pipe(
                    map((result) =>
                        SearchActions.querySuccess({
                            query: action.query,
                            result,
                        })
                    ),
                    catchError((error) =>
                        of(
                            SearchActions.queryFailure({
                                error: httpErrorHandler(error),
                            })
                        )
                    )
                )
            )
        );
    });

    queryMoreEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(SearchActions.queryRequest),
            withLatestFrom(
                this.store.select(searchSelectors.query),
                this.store.select(searchSelectors.activeResultStartIndex),
            ),
            filter(
                ([action, activeQueryTerm, activeQueryStart]) =>
                    activeQueryTerm === action.query &&
                    activeQueryStart !== action.start
            ),
            switchMap(([action,,]) =>
                this.api.search(action.query, action.start).pipe(
                    map((result) =>
                        SearchActions.queryMoreSuccess({
                            query: action.query,
                            result,
                        })
                    ),
                    catchError((error) =>
                        of(
                            SearchActions.queryMoreFailure({
                                error: httpErrorHandler(error),
                            })
                        )
                    )
                )
            )
        );
    });

    constructor(
        private actions$: Actions,
        private store: Store,
        @Inject(searchApiServiceToken) private api: SearchApiService
    ) {}
}
