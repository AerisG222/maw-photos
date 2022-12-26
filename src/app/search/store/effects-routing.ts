import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { filter, map, switchMap } from 'rxjs/operators';

import {
    RouterStoreActions,
    SettingsStoreActions,
    SettingsStoreSelectors,
} from '@core/root-store';
import { CategoryViewMode, RouteArea } from '@models';
import * as SearchStoreActions from './actions';
import * as SearchStoreSelectors from './selectors';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Injectable()
export class SearchStoreRoutingEffects {
    monitorWhenLeavingSearchArea$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(RouterStoreActions.routeAreaLeaving),
            filter((action) => action.leavingArea === RouteArea.search),
            map(() => SearchStoreActions.exitSearchArea())
        );
    });

    updateUrlOnQueryRequestEffect$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(SearchStoreActions.queryRequest),
                concatLatestFrom(() => this.store.select(SearchStoreSelectors.selectQuery)),
                filter(([action, activeQueryTerm]) => activeQueryTerm !== action.query),
                switchMap(([action,]) => {
                    return this.router.navigate([], {
                        relativeTo: this.router.routerState.root,
                        queryParams: { s: action.query },
                        queryParamsHandling: 'merge',
                    });
                })
            );
        }, { dispatch: false }
    );

    monitorViewChangedEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(RouterStoreActions.routeChanged),
            concatLatestFrom(() =>
                this.store.select(SettingsStoreSelectors.selectSearchPageSettings)
            ),
            filter(([action, pageSettings]) => {
                if (action.routeDetails.data.view) {
                    return (
                        action.routeDetails.area === RouteArea.search &&
                        action.routeDetails.data.view !== pageSettings.viewMode
                    );
                }
                return false;
            }),
            map(([action, pageSettings]) => {
                const newSettings = {
                    ...pageSettings,
                    viewMode: action.routeDetails.data.view as CategoryViewMode,
                };

                return SettingsStoreActions.saveSearchPageSettings({
                    settings: newSettings,
                });
            })
        );
    });

    constructor(
        private actions$: Actions,
        private store: Store,
        private router: Router,
    ) {}
}
