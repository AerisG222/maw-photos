import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';

import { RouterStoreSelectors } from '@core/root-store';
import * as StatsStoreActions from './actions';
import { RouteHelper } from '@models';

@Injectable()
export class StatsStoreEffects {
    selectYear$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(StatsStoreActions.selectYear),
                concatLatestFrom(() =>
                    this.store.select(RouterStoreSelectors.selectRouteDetails)
                ),
                switchMap(([action, details]) => {
                    return this.router.navigateByUrl(
                        RouteHelper.statsAbs(details.data.view as string | undefined, action.year)
                    );
                })
            );
        },
        { dispatch: false }
    );

    setAggregateBy$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(StatsStoreActions.selectAggregateBy),
                switchMap(({ agg }) => {
                    return this.router.navigate([], {
                        relativeTo: this.router.routerState.root,
                        queryParams: { agg },
                        queryParamsHandling: 'merge',
                    });
                })
            );
        },
        { dispatch: false }
    );

    constructor(
        private actions$: Actions,
        private store: Store,
        private router: Router
    ) {}
}
