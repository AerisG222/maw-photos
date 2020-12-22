import { Injectable, Inject } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of, combineLatest } from 'rxjs';
import { switchMap, catchError, map, withLatestFrom, filter } from 'rxjs/operators';

import * as SearchActions from './actions';
import * as searchSelectors from './selectors';
import { searchApiServiceToken, SearchApiService } from 'src/app/search/services/search-api.service';

@Injectable()
export class SearchStoreEffects {
    queryRequestEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(SearchActions.queryRequest),
            withLatestFrom(this.store.select(searchSelectors.query)),
            map(x => ({
                action: x[0],
                activeQueryTerm: x[1]
            })),
            filter(ctx => ctx.activeQueryTerm !== ctx.action.query),
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
            this.store.select(searchSelectors.query),
            this.store.select(searchSelectors.activeResultStartIndex)
        ]);

        return this.actions$.pipe(
            ofType(SearchActions.queryRequest),
            withLatestFrom(currentQueryInfo),
            map(x => ({
                action: x[0],
                activeQueryTerm: x[1][0],
                activeQueryStart: x[1][1]
            })),
            filter(ctx => ctx.activeQueryTerm === ctx.action.query && ctx.activeQueryStart !== ctx.action.start),
            switchMap(ctx =>
                this.api.search(ctx.action.query, ctx.action.start)
                    .pipe(
                        map(result => SearchActions.queryMoreSuccess({ query: ctx.action.query, result })),
                        catchError(error => of(SearchActions.queryMoreFailure({ error })))
                    )
            )
        );
    });

    constructor(
        private actions$: Actions,
        private store: Store,
        @Inject(searchApiServiceToken) private api: SearchApiService,
    ) {

    }
}
