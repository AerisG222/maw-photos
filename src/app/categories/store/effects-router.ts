import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

import * as CategoryStoreActions from './actions';

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

    constructor(
        private actions$: Actions,
        private router: Router
    ) {

    }
}
