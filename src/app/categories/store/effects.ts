import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { filter, map, switchMap, tap } from 'rxjs/operators';

import { CategoriesUrlService } from '../services/categories-url.service';
import {
    RootStoreSelectors,
    RouterStoreActions,
    SettingsStoreActions,
    SettingsStoreSelectors,
} from '@core/root-store';
import { CategoryViewMode, RouteArea } from '@models';

@Injectable()
export class CategoriesStoreEffects {
    categoryFilterUpdated$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(SettingsStoreActions.saveCategoryFilterSettingsSuccess),
                tap(({ settings }) =>
                    this.categoriesUrlService.updateFilterInUrl(settings)
                )
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
                    return this.store.select(RootStoreSelectors.selectAllYears).pipe(
                        filter((years) => years.length > 0),
                        switchMap(() =>
                            this.categoriesUrlService.ensureCompleteUrl(
                                routeDetails
                            )
                        )
                    );
                })
            );
        },
        { dispatch: false }
    );

    monitorViewChangedEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(RouterStoreActions.routeChanged),
            concatLatestFrom(() =>
                this.store.select(SettingsStoreSelectors.selectCategoryPageSettings)
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
        private categoriesUrlService: CategoriesUrlService,
        private store: Store
    ) {}
}
