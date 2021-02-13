import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { filter, map, switchMap, tap } from 'rxjs/operators';

import * as CategoryStoreActions from './actions';
import { CategoriesUrlService } from '../services/categories-url.service';
import { Store } from '@ngrx/store';
import { RootStoreSelectors, RouterStoreActions } from '@core/root-store';
import { RouteArea } from '@models';
import { CategoryFilterSettingsFacade } from '@core/facades/settings/category-filter-settings-facade';

@Injectable()
export class CategoriesStoreEffects {
    categoriesYearFilterChangedUpdateUrlEffect$ = createEffect(() => {
        // eslint-disable-next-line rxjs/no-cyclic-action
        return this.actions$.pipe(
            ofType(CategoryStoreActions.categoriesYearFilterChanged),
            tap(action => this.categoriesUrlService.updateYearFilterInUrl(action.filter))
        );
    }, { dispatch: false });

    categoriesTypeFilterChangedUpdateUrlEffect$ = createEffect(() => {
        // eslint-disable-next-line rxjs/no-cyclic-action
        return this.actions$.pipe(
            ofType(CategoryStoreActions.categoriesTypeFilterChanged),
            tap(action => this.categoriesUrlService.updateCategoryTypeFilterInUrl(action.filter))
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
        private store: Store,
        private filterSettings: CategoryFilterSettingsFacade
    ) {

    }
}
