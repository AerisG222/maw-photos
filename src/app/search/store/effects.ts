import { Injectable, Inject } from '@angular/core';
import { Actions, ofType, createEffect, concatLatestFrom } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import {
    switchMap,
    catchError,
    map,
    filter,
} from 'rxjs/operators';

import * as SearchStoreActions from './actions';
import * as SearchStoreSelectors from './selectors';
import {
    searchApiServiceToken,
    SearchApiService,
} from 'src/app/search/services/search-api.service';
import { httpErrorHandler, isTruthy } from '@models';
import { RouterStoreActions } from '@core/root-store';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class SearchStoreEffects {
    queryOnRouteChange$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(RouterStoreActions.routeChanged),
                map(({routeDetails}) => routeDetails.queryParams?.s as string),
                filter(query => isTruthy(query)),
                switchMap((query) => {
                    return this.api.search(query, 0).pipe(
                        map((result) =>
                            SearchStoreActions.querySuccess({
                                query,
                                result,
                            })
                        ),
                        catchError((error) =>
                            of(
                                SearchStoreActions.queryFailure({
                                    error: httpErrorHandler(error as HttpErrorResponse),
                                })
                            )
                        )
                    );
                })
            );
        }
    );

    queryMoreEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(SearchStoreActions.queryRequest),
            concatLatestFrom(() => [
                this.store.select(SearchStoreSelectors.selectQuery),
                this.store.select(SearchStoreSelectors.selectActiveResultStartIndex),
            ]),
            filter(
                ([action, activeQueryTerm, activeQueryStart]) =>
                    activeQueryTerm === action.query &&
                    activeQueryStart !== action.start
            ),
            switchMap(([action,,]) =>
                this.api.search(action.query, action.start).pipe(
                    map((result) =>
                        SearchStoreActions.queryMoreSuccess({
                            query: action.query,
                            result,
                        })
                    ),
                    catchError((error) =>
                        of(
                            SearchStoreActions.queryMoreFailure({
                                error: httpErrorHandler(error as HttpErrorResponse),
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
