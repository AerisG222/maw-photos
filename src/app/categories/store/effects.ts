import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { filter, map, switchMap, tap } from 'rxjs/operators';

import { SettingsStoreActions } from '@core/root-store/settings-store';
import * as CategoryStoreActions from './actions';
import { CategoriesUrlService } from '../services/categories-url.service';
import { combineLatest } from 'rxjs';
import { Store } from '@ngrx/store';
import { RootStoreSelectors, RouterStoreSelectors } from '@core/root-store';
import { RouteArea } from '@models';

@Injectable()
export class CategoriesStoreEffects {
    categoriesYearFilterChangedSaveSettingEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(CategoryStoreActions.categoriesYearFilterChanged),
            map(action => SettingsStoreActions.updateCategoryListYearFilterRequest({ yearFilter: action.filter }))
        );
    });

    categoriesYearFilterChangedUpdateUrlEffect$ = createEffect(() => {
        // eslint-disable-next-line rxjs/no-cyclic-action
        return this.actions$.pipe(
            ofType(CategoryStoreActions.categoriesYearFilterChanged),
            tap(action => this.categoriesUrlService.updateYearFilterInUrl(action.filter))
        );
    }, { dispatch: false });

    categoriesTypeFilterChangedSaveSettingEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(CategoryStoreActions.categoriesTypeFilterChanged),
            map(action => SettingsStoreActions.updateCategoryListCategoryFilterRequest({ newFilter: action.filter }))
        );
    });

    categoriesTypeFilterChangedUpdateUrlEffect$ = createEffect(() => {
        // eslint-disable-next-line rxjs/no-cyclic-action
        return this.actions$.pipe(
            ofType(CategoryStoreActions.categoriesTypeFilterChanged),
            tap(action => this.categoriesUrlService.updateCategoryTypeFilterInUrl(action.filter))
        );
    }, { dispatch: false });

    ensureCompleteUrl$ = createEffect(() => {
        return combineLatest([
            this.store.select(RouterStoreSelectors.selectRouteDetails),
            this.store.select(RootStoreSelectors.allYears)
        ]).pipe(
            filter(([route, years]) => route.area === RouteArea.categories),
            filter(([route, years]) => years.length > 0),
            switchMap(([route, years]) => this.categoriesUrlService.ensureCompleteUrl(route))
        );
    }, { dispatch: false });

    constructor(
        private actions$: Actions,
        private categoriesUrlService: CategoriesUrlService,
        private store: Store
    ) {

    }
}
