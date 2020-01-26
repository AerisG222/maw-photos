import { Injectable, Inject } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs';
import { switchMap, catchError, map, withLatestFrom, filter } from 'rxjs/operators';

import * as SearchStoreActions from './actions';
import * as searchSelectors from './selectors';
import { searchApiServiceToken, SearchApiService } from '../../services/search-api.service';

@Injectable()
export class SearchStoreEffects {
    constructor(
        private actions$: Actions,
        private store$: Store<{}>,
        @Inject(searchApiServiceToken) private api: SearchApiService,
    ) {

    }

    queryRequestEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SearchStoreActions.queryRequest),
            withLatestFrom(this.store$.pipe(
                select(searchSelectors.selectQuery)
            )),
            map(x => ({
                action: x[0],
                currentQuery: x[1]
            })),
            filter(ctx => ctx.currentQuery !== ctx.action.query),
            switchMap(ctx =>
                this.api.search(ctx.action.query)
                    .pipe(
                        map(result => SearchStoreActions.querySuccess({ result })),
                        catchError(error => of(SearchStoreActions.queryFailure({ error })))
                    )
            )
        )
    );

    queryNextPageRequestEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SearchStoreActions.queryNextPageRequest),
            switchMap(action =>
                this.api.searchNextPage(action.start)
                    .pipe(
                        map(result => SearchStoreActions.queryNextPageSuccess({ result })),
                        catchError(error => of(SearchStoreActions.queryNextPageFailure({ error })))
                    )
            )
        )
    );
}
