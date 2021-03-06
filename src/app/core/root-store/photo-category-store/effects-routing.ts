import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, createEffect, concatLatestFrom } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, filter, switchMap } from 'rxjs/operators';

import { RouteArea, RouteHelper } from '@models';
import { RouterStoreActions, RouterStoreSelectors } from '../router-store';
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
            concatLatestFrom(() =>
                this.store.select(PhotoCategoryStoreSelectors.allCategories)
            ),
            filter(([, categories]) => !categories || categories.length === 0),
            map(() => PhotoCategoryStoreActions.loadRequest())
        );
    });

    verifyActiveCategoryOnRouteChange$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(
                    RouterStoreActions.routeChanged,
                    PhotoCategoryStoreActions.loadSuccess
                ),
                concatLatestFrom(() => [
                    this.store.select(RouterStoreSelectors.selectRouteDetails),
                    this.store.select(PhotoCategoryStoreSelectors.allEntities),
                    this.store.select(PhotoCategoryStoreSelectors.allCategories)
                ]),
                filter(([, routeDetails, , categories]) => {
                    return routeDetails.area === RouteArea.photos &&
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
