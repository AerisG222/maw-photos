import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { combineLatest } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';

import * as CategoryStoreActions from './actions';
import { RouterStoreSelectors } from '@core/root-store';
import { CategoriesUrlService } from '../services/categories-url.service';
import { Store } from '@ngrx/store';

@Injectable()
export class CategoriesStoreRouterEffects {
    categoriesYearFilterChanged$ = createEffect(() => {
        // eslint-disable-next-line rxjs/no-cyclic-action
        return this.actions$.pipe(
            ofType(CategoryStoreActions.categoriesYearFilterChanged),
            tap(action => this.router.navigate(['.'], { queryParams: { year: action.filter }, queryParamsHandling: 'merge' }))
        );
    }, { dispatch: false });

    categoriesTypeFilterChanged$ = createEffect(() => {
        // eslint-disable-next-line rxjs/no-cyclic-action
        return this.actions$.pipe(
            ofType(CategoryStoreActions.categoriesTypeFilterChanged),
            tap(action => this.router.navigate(['.'], { queryParams: { type: action.filter }, queryParamsHandling: 'merge' }))
        );
    }, { dispatch: false });

    // originally tried to implement as a canactivate guard, but resolvers won't have run when that is called
    ensureCompleteUrl$ = createEffect(() => {
        return combineLatest([
            this.store.select(RouterStoreSelectors.selectRouteDetails),
            this.store.select(RouterStoreSelectors.isCategoriesArea)
        ]).pipe(
            filter(([routeDetails, isCategoriesArea]) => isCategoriesArea),
            switchMap(([routeDetails, isCategoriesArea]) => this.categoriesUrlSerice.ensureCompleteUrl(routeDetails))
        );
    }, { dispatch: false });

    constructor(
        private actions$: Actions,
        private router: Router,
        private store: Store,
        private categoriesUrlSerice: CategoriesUrlService
    ) {

    }
}
