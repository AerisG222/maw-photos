import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs/operators';

import { SettingsStoreActions } from '@core/root-store/settings-store';
import * as CategoryStoreActions from './actions';
import { CategoriesUrlService } from '../services/categories-url.service';

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

    // originally tried to implement as a canactivate guard, but resolvers won't have run when that is called
    ensureCompleteUrl$ = createEffect(() => {
        return this.categoriesUrlService.categoriesBeforeNavigate$.pipe(
            switchMap(routeDetails => this.categoriesUrlService.ensureCompleteUrl(routeDetails))
        );
    }, { dispatch: false });

    constructor(
        private actions$: Actions,
        private categoriesUrlService: CategoriesUrlService
    ) {

    }
}
