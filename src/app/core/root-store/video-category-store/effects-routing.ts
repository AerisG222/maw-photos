import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, map, tap, withLatestFrom } from 'rxjs/operators';

import { RouteArea, RouteHelper } from '@models';
import { RouterStoreActions } from '../router-store';
import * as VideoCategoryStoreActions from './actions';
import * as VideoCategoryStoreSelectors from './selectors';

@Injectable()
export class VideoCategoryStoreRoutingEffects {
    ensureVideoCategoriesLoadedEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(RouterStoreActions.routeAreaChanged),
            filter((change) =>
                RouteHelper.doesRouteAreaNeedCategoryData(change.enteringArea)
            ),
            withLatestFrom(
                this.store.select(VideoCategoryStoreSelectors.allCategories)
            ),
            filter(([, categories]) => !categories || categories.length === 0),
            map(() => VideoCategoryStoreActions.loadRequest())
        );
    });

    verifyActiveCategoryOnRouteChange$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(RouterStoreActions.routeChanged),
                filter(
                    (action) => action.routeDetails.area === RouteArea.videos
                ),
                withLatestFrom(
                    this.store.select(VideoCategoryStoreSelectors.allEntities)
                ),
                filter(([action, entities]) => {
                    const catId = Number(action.routeDetails.params.categoryId);

                    return isNaN(catId) || !(catId in entities);
                }),
                tap(() =>
                    this.router.navigateByUrl(RouteHelper.categoriesAbs())
                )
            );
        },
        { dispatch: false }
    );

    setActiveCategoryWhenEnteringVideoArea$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(RouterStoreActions.routeAreaEntering),
            filter((action) => action.enteringArea === RouteArea.videos),
            map((action) =>
                VideoCategoryStoreActions.setActiveCategoryId({
                    categoryId: action.enteringRouteDetails?.params.categoryId,
                })
            )
        );
    });

    resetActiveCategoryWhenLeavingVideoArea$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(RouterStoreActions.routeAreaLeaving),
            filter((action) => action.leavingArea === RouteArea.videos),
            map(() =>
                VideoCategoryStoreActions.setActiveCategoryId({
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
