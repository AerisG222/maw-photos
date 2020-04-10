import { Injectable, Inject } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { of, combineLatest } from 'rxjs';
import { switchMap, catchError, map, withLatestFrom, filter } from 'rxjs/operators';

import * as SearchActions from './actions';
import * as searchSelectors from './selectors';
import { searchApiServiceToken, SearchApiService } from 'src/app/search/services/search-api.service';

@Injectable()
export class SearchStoreEffects {
    constructor(
        private actions$: Actions,
        private store$: Store,
        @Inject(searchApiServiceToken) private api: SearchApiService,
    ) {

    }

    queryRequestEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(SearchActions.queryRequest),
            withLatestFrom(
                this.store$.pipe(select(searchSelectors.selectSearchQuery))
            ),
            map(x => ({
                action: x[0],
                currentQueryTerm: x[1]
            })),
            filter(ctx => ctx.currentQueryTerm !== ctx.action.query),
            switchMap(ctx =>
                this.api.search(ctx.action.query, ctx.action.start)
                    .pipe(
                        map(result => SearchActions.querySuccess({ query: ctx.action.query, result })),
                        catchError(error => of(SearchActions.queryFailure({ error })))
                    )
            )
        );
    });

    queryMoreEffect$ = createEffect(() => {
        const currentQueryInfo = combineLatest([
            this.store$.pipe(select(searchSelectors.selectSearchQuery)),
            this.store$.pipe(select(searchSelectors.selectSearchCurrentStartIndex))
        ]);

        return this.actions$.pipe(
            ofType(SearchActions.queryRequest),
            withLatestFrom(currentQueryInfo),
            map(x => ({
                action: x[0],
                currentQueryTerm: x[1][0],
                currentQueryStart: x[1][1]
            })),
            filter(ctx => ctx.currentQueryTerm === ctx.action.query && ctx.currentQueryStart !== ctx.action.start),
            switchMap(ctx =>
                this.api.search(ctx.action.query, ctx.action.start)
                    .pipe(
                        map(result => SearchActions.queryMoreSuccess({ query: ctx.action.query, result })),
                        catchError(error => of(SearchActions.queryMoreFailure({ error })))
                    )
            )
        );
    });
}
