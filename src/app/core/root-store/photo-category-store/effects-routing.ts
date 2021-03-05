import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, withLatestFrom, filter, tap, switchMap } from 'rxjs/operators';

import { RouteArea, RouteHelper } from '@models';
import { RouterStoreActions } from '../router-store';
import * as PhotoCategoryStoreActions from './actions';
import * as PhotoCategoryStoreSelectors from './selectors';

@Injectable()
export class PhotoCategoryStoreRoutingEffects {
    ensurePhotoCategoriesLoadedEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(RouterStoreActions.routeAreaChanged),
            filter((change) =>
                RouteHelper.doesRouteAreaNeedCategoryData(change.enteringArea)
            ),
            withLatestFrom(
                this.store.select(PhotoCategoryStoreSelectors.allCategories)
            ),
            filter(([, categories]) => !categories || categories.length === 0),
            map(() => PhotoCategoryStoreActions.loadRequest())
        );
    });

    verifyActiveCategoryOnRouteChange$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(RouterStoreActions.routeChanged),
                filter(
                    (action) => action.routeDetails.area === RouteArea.photos
                ),
                withLatestFrom(
                    this.store.select(PhotoCategoryStoreSelectors.allEntities),
                    this.store.select(PhotoCategoryStoreSelectors.allCategories)
                ),
                // TODO: the following makes sure we have categories which might not be loaded yet,
                // in particular when redirecting to a deep link after login.  but how should we verify
                // the category once it does load (as the route event already passed)
                filter(([, , categories]) => !!categories && categories.length > 0),
                filter(([action, entities]) => {
                    const catId = Number(action.routeDetails.params.categoryId);

                    return isNaN(catId) || !(catId in entities);
                }),
                switchMap(
                    () => {
                        return this.router.navigateByUrl(
                            RouteHelper.categoriesAbs()
                        )
                    }
                )
            );
        },
        { dispatch: false }
    );

    setActiveCategoryWhenEnteringPhotoArea$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(RouterStoreActions.routeAreaEntering),
            filter((action) => action.enteringArea === RouteArea.photos),
            map((action) =>
                PhotoCategoryStoreActions.setActiveCategoryId({
                    categoryId: action.enteringRouteDetails?.params
                        .categoryId as number,
                })
            )
        );
    });

    resetActiveCategoryWhenLeavingPhotoArea$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(RouterStoreActions.routeAreaLeaving),
            filter((action) => action.leavingArea === RouteArea.photos),
            map(() =>
                PhotoCategoryStoreActions.setActiveCategoryId({
                    categoryId: null,
                })
            )
        );
    });

    constructor(
        private actions$: Actions,
        private store: Store,
        private router: Router
    ) {}
}
