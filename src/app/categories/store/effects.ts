import { Injectable } from '@angular/core';
import { SettingsStoreActions } from '@core/root-store/settings-store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';

import * as CategoryStoreActions from './actions';

@Injectable()
export class CategoriesStoreEffects {
    categoriesYearFilterChanged$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(CategoryStoreActions.categoriesYearFilterChanged),
            map(action => SettingsStoreActions.updateCategoryListYearFilterRequest({ yearFilter: action.filter }))
        );
    });

    categoriesTypeFilterChanged$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(CategoryStoreActions.categoriesTypeFilterChanged),
            map(action => SettingsStoreActions.updateCategoryListCategoryFilterRequest({ newFilter: action.filter }))
        );
    });

    constructor(
        private actions$: Actions
    ) {

    }
}
