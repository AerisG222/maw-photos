import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { filter, map, tap, withLatestFrom } from 'rxjs/operators';

import * as RouterStoreActions from '@core/root-store/router-store/actions';
import { RouteArea } from '@models';
import { RouteHelperService } from '../../services/route-helper.service';
import { PhotoCategoryStoreSelectors } from '../photo-category-store';
import { RouterStoreSelectors } from '../router-store';
import * as PhotoStoreActions from './actions';
import * as PhotoStoreSelectors from './selectors';
import { LayoutStoreActions } from '../layout-store';

@Injectable()
export class PhotoStoreRoutingEffects {
    photoRoutes$ = this.actions$.pipe(
        ofType(RouterStoreActions.routeChanged),
        map(action => {
            if(action.routeDetails.area === RouteArea.photos) {
                return action.routeDetails;
            } else {
                return null;
            }
        })
    );

    navigateToPhoto$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(PhotoStoreActions.navigateToPhoto),
            map(action => this.routeBuilderService.photoCategoriesAbs(action.view, action.categoryId, action.photoId)),
            tap(url => this.router.navigateByUrl(url))
        );
    }, { dispatch: false });

    navigateUpFromIndividualPhoto$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(PhotoStoreActions.navigateUpFromIndividualPhoto),
            withLatestFrom(this.store.select(RouterStoreSelectors.selectUrl)),
            tap(([action, url]) => {
                if(!!url) {
                    this.router.navigateByUrl(url.substring(0, url.lastIndexOf('/')));
                }
            })
        );
    }, { dispatch: false });

    setActivePhotoFromRoute = createEffect(() => {
        return combineLatest([
            this.actions$.pipe(ofType(RouterStoreActions.routeChanged)),
            this.store.select(PhotoStoreSelectors.allEntities),
            this.store.select(PhotoStoreSelectors.allIds)
        ]).pipe(
            filter(([action, entities, ids]) => {
                return action.routeDetails.area === RouteArea.photos &&
                    !!entities &&
                    !!ids &&
                    ids.length > 0;
            }),
            map(([action, entities, ids]) => {
                const categoryId = Number(action.routeDetails.params.categoryId);
                const photoId = Number(action.routeDetails.params.photoId);
                const requiresPhotoId = action.routeDetails.data.requirePhotoId as boolean ?? false;
                const view = action.routeDetails.data.view as string ?? RouteHelperService.photoViewDefault;

                if (requiresPhotoId) {
                    if(isNaN(photoId) || !(photoId in entities)) {
                        return PhotoStoreActions.navigateToPhoto({
                            view,
                            categoryId,
                            photoId: ids[0] as number
                        });
                    } else {
                        return PhotoStoreActions.setActivePhotoId({ id: photoId });
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
            filter(action => action.enteringArea === RouteArea.random),
            map(action => PhotoStoreActions.loadMultipleRandomRequest({ count: 10 }))
        );
    });

    startPeriodicLoadOfRandomPhotosWhenEnteringRandomArea$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(RouterStoreActions.routeAreaEntering),
            filter(action => action.enteringArea === RouteArea.random),
            map(action => PhotoStoreActions.startPeriodicRandomLoad())
        );
    });

    stopPeriodicLoadOfRandomPhotosWhenExitingRandomArea$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(RouterStoreActions.routeAreaLeaving),
            filter(action => action.leavingArea === RouteArea.random),
            map(area => PhotoStoreActions.stopPeriodicRandomLoad())
        );
    });

    loadPhotosWhenEnteringPhotoArea$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(RouterStoreActions.routeAreaEntering),
            filter(action => action.enteringArea === RouteArea.photos),
            map(action => PhotoStoreActions.loadRequest({ categoryId: action.enteringRouteDetails?.params?.categoryId }))
        );
    });

    monitorWhenLeavingPhotoArea$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(RouterStoreActions.routeAreaLeaving),
            filter(action => action.leavingArea === RouteArea.photos || action.leavingArea === RouteArea.random),
            map(area => PhotoStoreActions.exitPhotoArea())
        );
    });

    monitorFullScreenView$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(PhotoStoreActions.changeViewRequest),
            map(action => {
                if(action?.view === RouteHelperService.photoViewFullscreen) {
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
            map(action => LayoutStoreActions.exitFullscreenRequest())
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

                if(action.view === RouteHelperService.photoViewBulkEdit ||
                    action.view === RouteHelperService.photoViewGrid
                ) {
                    id = undefined;
                }

                return PhotoStoreActions.navigateToPhoto({
                    view: action.view,
                    categoryId: categoryId as number,
                    photoId: id
                });
            })
        );
    });

    constructor(
        private actions$: Actions,
        private store: Store,
        private router: Router,
        private routeBuilderService: RouteHelperService
    ) {

    }
}
