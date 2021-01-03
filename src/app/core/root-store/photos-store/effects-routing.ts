import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

import * as RouterStoreActions from 'src/app/core/root-store/router-store/actions';
import { RouteArea } from 'src/app/models/route-area';
import { RouteHelperService } from '../../services/route-helper.service';
import * as PhotoStoreActions from './actions';
import * as PhotoStoreSelectors from './selectors';

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
            map(action => this.routeBuilderService.photoCategoriesAbs(action.categoryId, action.photoId)),
         //   tap(url => this.router.navigateByUrl(url))
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

                // if invalid photo id or is not present in url, go to first
                if (isNaN(photoId) || !(photoId in entities)) {
                    return PhotoStoreActions.navigateToPhoto({
                        categoryId,
                        photoId: ids[0] as number
                    });
                } else {
                    return PhotoStoreActions.setActivePhotoId({ id: photoId });
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

    constructor(
        private actions$: Actions,
        private store: Store,
        private router: Router,
        private routeBuilderService: RouteHelperService
    ) {

    }
}
