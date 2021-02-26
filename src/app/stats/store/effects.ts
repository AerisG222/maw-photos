import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { filter, map, switchMap, withLatestFrom } from 'rxjs/operators';

import {
    RootStoreSelectors,
    RouterStoreActions,
    RouterStoreSelectors,
    SettingsStoreActions,
    SettingsStoreSelectors,
} from '@core/root-store';
import * as StatsStoreActions from './actions';
import { CategoryViewMode, RouteArea, RouteHelper } from '@models';
import { Router } from '@angular/router';

@Injectable()
export class StatsStoreEffects {
    selectYear$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(StatsStoreActions.selectYear),
                withLatestFrom(this.store.select(RouterStoreSelectors.selectRouteDetails)),
                switchMap(([action, details]) => {
                    return this.router.navigateByUrl(RouteHelper.statsAbs(details.data.view, action.year));
                })
            );
        },
        { dispatch: false }
    );

    ensureCompleteUrlOnRouteChange$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(RouterStoreActions.routeChanged),
                filter(
                    (route) => route.routeDetails.area === RouteArea.categories
                ),
                switchMap(({ routeDetails }) => {
                    return this.store.select(RootStoreSelectors.allYears).pipe(
                        filter((years) => years.length > 0),
                        /* switchMap(() =>
                            this.categoriesUrlService.ensureCompleteUrl(
                                routeDetails
                            )
                        )*/
                    );
                })
            );
        },
        { dispatch: false }
    );

    monitorViewChangedEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(RouterStoreActions.routeChanged),
            withLatestFrom(
                this.store.select(SettingsStoreSelectors.categoryPageSettings)
            ),
            filter(([action, pageSettings]) => {
                if (action.routeDetails.data.view) {
                    return (
                        action.routeDetails.area === RouteArea.categories &&
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

                return SettingsStoreActions.saveCategoryPageSettings({
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
