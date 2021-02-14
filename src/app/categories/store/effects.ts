import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { filter, switchMap, tap } from 'rxjs/operators';

import { CategoriesUrlService } from '../services/categories-url.service';
import { RootStoreSelectors, RouterStoreActions, SettingsStoreActions } from '@core/root-store';
import { RouteArea } from '@models';

@Injectable()
export class CategoriesStoreEffects {
    categoryFilterUpdated$ = createEffect(() => {
        // eslint-disable-next-line rxjs/no-cyclic-action
        return this.actions$.pipe(
            ofType(SettingsStoreActions.saveCategoryFilterSettingsSuccess),
            tap(({ settings }) => this.categoriesUrlService.updateFilterInUrl(settings))
        );
    }, { dispatch: false });

    ensureCompleteUrlOnRouteChange$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(RouterStoreActions.routeChanged),
            filter(route => route.routeDetails.area === RouteArea.categories),
            switchMap(action => {
                return this.store.select(RootStoreSelectors.allYears).pipe(
                    filter((years) => years.length > 0),
                    switchMap((years) => this.categoriesUrlService.ensureCompleteUrl(action.routeDetails))
                );
            })
        );
    }, { dispatch: false });

    constructor(
        private actions$: Actions,
        private categoriesUrlService: CategoriesUrlService,
        private store: Store
    ) {

    }
}
