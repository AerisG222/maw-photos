import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { filter, map, tap, withLatestFrom } from 'rxjs/operators';

import * as RouterStoreActions from '@core/root-store/router-store/actions';
import { RouteArea, RouteDetails, RouteHelper } from '@models';
import { PhotoCategoryStoreSelectors } from '../photo-category-store';
import { RouterStoreSelectors } from '../router-store';
import * as PhotoStoreActions from './actions';
import * as PhotoStoreSelectors from './selectors';
import { LayoutStoreActions } from '../layout-store';

@Injectable()
export class PhotoStoreRoutingEffects {
    navigateToPhoto$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(PhotoStoreActions.navigateToPhoto),
                withLatestFrom(
                    this.store.select(RouterStoreSelectors.isPhotosView),
                    this.store.select(RouterStoreSelectors.isRandomView)
                ),
                map(([action, isPhotos, isRandom]) => {
                    if (isPhotos) {
                        return RouteHelper.photoCategoriesAbs(
                            action.view,
                            action.categoryId,
                            action.photoId
                        );
                    } else if (isRandom) {
                        return RouteHelper.randomAbs(
                            action.view,
                            action?.photoId
                        );
                    }

                    return null;
                }),
                filter((url) => !!url),
                tap((url) => this.router.navigateByUrl(url as string))
            );
        },
        { dispatch: false }
    );

    navigateUpFromIndividualPhoto$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(PhotoStoreActions.navigateUpFromIndividualPhoto),
                withLatestFrom(
                    this.store.select(RouterStoreSelectors.selectUrl)
                ),
                tap(([action, url]) => {
                    if (url) {
                        this.router.navigateByUrl(
                            url.substring(0, url.lastIndexOf('/'))
                        );
                    }
                })
            );
        },
        { dispatch: false }
    );

    setActivePhotoFromRoute$ = createEffect(() => {
        return combineLatest([
            this.store.select(RouterStoreSelectors.selectRouteDetails),
            this.store.select(PhotoStoreSelectors.allEntities),
            this.store.select(PhotoStoreSelectors.allIds),
            this.store.select(PhotoStoreSelectors.activePhotoId),
        ]).pipe(
            filter(([routeDetails, entities, ids, activeId]) => {
                return (
                    (routeDetails.area === RouteArea.photos ||
                        routeDetails.area === RouteArea.random) &&
                    !!entities &&
                    !!ids?.length &&
                    this.isActiveIdDifferentFromRoute(activeId, routeDetails)
                );
            }),
            map(([routeDetails, entities, ids]) => {
                const categoryId = Number(routeDetails.params.categoryId);
                const photoId = Number(routeDetails.params.photoId);
                const requiresPhotoId =
                    (routeDetails.data.requirePhotoId as boolean) ?? false;
                const view =
                    (routeDetails.data.view as string) ??
                    RouteHelper.photoViewDefault;

                if (requiresPhotoId) {
                    if (isNaN(photoId) || !(photoId in entities)) {
                        return PhotoStoreActions.navigateToPhoto({
                            view,
                            categoryId,
                            photoId: ids[0] as number,
                        });
                    } else {
                        return PhotoStoreActions.setActivePhotoId({
                            id: photoId,
                        });
                    }
                } else {
                    return PhotoStoreActions.setActivePhotoId({ id: null });
                }
            })
        );
    });

    loadRandomPhotosWhenEnteringRandomArea$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(RouterStoreActions.routeAreaEntering),
            filter((action) => action.enteringArea === RouteArea.random),
            map((action) =>
                PhotoStoreActions.loadMultipleRandomRequest({ count: 10 })
            )
        );
    });

    startPeriodicLoadOfRandomPhotosWhenEnteringRandomArea$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(RouterStoreActions.routeAreaEntering),
                filter((action) => action.enteringArea === RouteArea.random),
                map((action) => PhotoStoreActions.startPeriodicRandomLoad())
            );
        }
    );

    stopPeriodicLoadOfRandomPhotosWhenExitingRandomArea$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(RouterStoreActions.routeAreaLeaving),
            filter((action) => action.leavingArea === RouteArea.random),
            map((area) => PhotoStoreActions.stopPeriodicRandomLoad())
        );
    });

    loadPhotosWhenEnteringPhotoArea$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(RouterStoreActions.routeAreaEntering),
            filter((action) => action.enteringArea === RouteArea.photos),
            map((action) =>
                PhotoStoreActions.loadRequest({
                    categoryId: action.enteringRouteDetails?.params?.categoryId,
                })
            )
        );
    });

    monitorWhenLeavingPhotoArea$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(RouterStoreActions.routeAreaLeaving),
            filter(
                (action) =>
                    action.leavingArea === RouteArea.photos ||
                    action.leavingArea === RouteArea.random
            ),
            map((area) => PhotoStoreActions.exitPhotoArea())
        );
    });

    monitorFullScreenView$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(PhotoStoreActions.changeViewRequest),
            map((action) => {
                if (action?.view === RouteHelper.photoViewFullscreen) {
                    return LayoutStoreActions.enterFullscreenRequest();
                } else {
                    return LayoutStoreActions.exitFullscreenRequest();
                }
            })
        );
    });

    exitFullScreenLayoutWhenLeavingPhotos$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(RouterStoreActions.routeAreaLeaving),
            map((action) => LayoutStoreActions.exitFullscreenRequest())
        );
    });

    changeView$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(PhotoStoreActions.changeViewRequest),
            withLatestFrom(
                this.store.select(PhotoCategoryStoreSelectors.activeCategoryId),
                this.store.select(PhotoStoreSelectors.activePhotoId)
            ),
            map(([action, categoryId, photoId]) => {
                let id = photoId ?? undefined;

                if (
                    action.view === RouteHelper.photoViewBulkEdit ||
                    action.view === RouteHelper.photoViewGrid
                ) {
                    id = undefined;
                }

                return PhotoStoreActions.navigateToPhoto({
                    view: action.view,
                    categoryId: categoryId as number,
                    photoId: id,
                });
            })
        );
    });

    constructor(
        private actions$: Actions,
        private store: Store,
        private router: Router
    ) {}

    private isActiveIdDifferentFromRoute(
        activeId: number | null,
        routeDetails: RouteDetails
    ): boolean {
        const id = Number(routeDetails?.params?.photoId);
        const photoId = isNaN(id) ? null : id;

        return activeId !== id;
    }
}
