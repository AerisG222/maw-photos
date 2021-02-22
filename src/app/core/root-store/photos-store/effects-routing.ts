import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { filter, map, tap, withLatestFrom } from 'rxjs/operators';

import * as RouterStoreActions from '@core/root-store/router-store/actions';
import { PhotoViewMode, RouteArea, RouteDetails, RouteHelper } from '@models';
import { RouterStoreSelectors } from '../router-store';
import * as PhotoStoreActions from './actions';
import * as PhotoStoreSelectors from './selectors';
import {
    SettingsStoreActions,
    SettingsStoreSelectors,
} from '../settings-store';

@Injectable()
export class PhotoStoreRoutingEffects {
    navigateToPhoto$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(PhotoStoreActions.navigateToPhoto),
                withLatestFrom(
                    this.store.select(RouterStoreSelectors.inPhotosArea),
                    this.store.select(RouterStoreSelectors.inRandomArea)
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
                tap((url) => void this.router.navigateByUrl(url as string))
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
                tap(([, url]) => {
                    if (url) {
                        void this.router.navigateByUrl(
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
            map(() =>
                PhotoStoreActions.loadMultipleRandomRequest({ count: 10 })
            )
        );
    });

    startPeriodicLoadOfRandomPhotosWhenEnteringRandomArea$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(RouterStoreActions.routeAreaEntering),
                filter((action) => action.enteringArea === RouteArea.random),
                map(() => PhotoStoreActions.startPeriodicRandomLoad())
            );
        }
    );

    stopPeriodicLoadOfRandomPhotosWhenExitingRandomArea$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(RouterStoreActions.routeAreaLeaving),
            filter((action) => action.leavingArea === RouteArea.random),
            map(() => PhotoStoreActions.stopPeriodicRandomLoad())
        );
    });

    loadPhotosWhenEnteringPhotoArea$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(RouterStoreActions.routeAreaEntering),
            filter((action) => action.enteringArea === RouteArea.photos),
            map((action) =>
                PhotoStoreActions.loadRequest({
                    categoryId: action.enteringRouteDetails?.params
                        ?.categoryId as number,
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
            map(() => PhotoStoreActions.exitPhotoArea())
        );
    });

    monitorPhotosViewChangedEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(RouterStoreActions.routeChanged),
            withLatestFrom(
                this.store.select(SettingsStoreSelectors.photoPageSettings)
            ),
            filter(([action, pageSettings]) => {
                if (action.routeDetails.data.view) {
                    return (
                        action.routeDetails.area === RouteArea.photos &&
                        action.routeDetails.data.view !== pageSettings.viewMode
                    );
                }
                return false;
            }),
            map(([action, pageSettings]) => {
                const newSettings = {
                    ...pageSettings,
                    viewMode: action.routeDetails.data.view as PhotoViewMode,
                };

                return SettingsStoreActions.savePhotoPageSettings({
                    settings: newSettings,
                });
            })
        );
    });

    monitorRandomViewChangedEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(RouterStoreActions.routeChanged),
            withLatestFrom(
                this.store.select(SettingsStoreSelectors.randomPageSettings)
            ),
            filter(([action, pageSettings]) => {
                if (action.routeDetails.data.view) {
                    return (
                        action.routeDetails.area === RouteArea.random &&
                        action.routeDetails.data.view !== pageSettings.viewMode
                    );
                }
                return false;
            }),
            map(([action, pageSettings]) => {
                const newSettings = {
                    ...pageSettings,
                    viewMode: action.routeDetails.data.view as PhotoViewMode,
                };

                return SettingsStoreActions.saveRandomPageSettings({
                    settings: newSettings,
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

        return activeId !== id;
    }
}
