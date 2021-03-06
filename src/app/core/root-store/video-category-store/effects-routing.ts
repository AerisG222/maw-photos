import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createEffect, ofType, Actions, concatLatestFrom } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, map, switchMap } from 'rxjs/operators';

import { RouteArea, RouteHelper } from '@models';
import { RouterStoreActions, RouterStoreSelectors } from '../router-store';
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
            concatLatestFrom(() =>
                this.store.select(VideoCategoryStoreSelectors.allCategories)
            ),
            filter(([, categories]) => !categories || categories.length === 0),
            map(() => VideoCategoryStoreActions.loadRequest())
        );
    });

    verifyActiveCategoryOnRouteChange$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(
                    RouterStoreActions.routeChanged,
                    VideoCategoryStoreActions.loadSuccess
                ),
                concatLatestFrom(() => [
                    this.store.select(RouterStoreSelectors.selectRouteDetails),
                    this.store.select(VideoCategoryStoreSelectors.allEntities),
                    this.store.select(VideoCategoryStoreSelectors.allCategories)
                ]),
                filter(([, routeDetails, , categories]) => {
                    return routeDetails.area === RouteArea.videos &&
                        !!categories &&
                        categories.length > 0;
                }),
                filter(([, routeDetails, entities]) => {
                    const catId = Number(routeDetails.params.categoryId);

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

    setActiveCategoryWhenEnteringVideoArea$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(RouterStoreActions.routeAreaEntering),
            filter((action) => action.enteringArea === RouteArea.videos),
            map((action) =>
                VideoCategoryStoreActions.setActiveCategoryId({
                    categoryId: action.enteringRouteDetails?.params
                        .categoryId as number,
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
