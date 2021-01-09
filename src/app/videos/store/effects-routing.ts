import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

import { RouterStoreActions } from '@core/root-store';
import { RouteHelperService } from '@core/services/route-helper.service';
import { RouteArea } from '@models/route-area';
import * as VideoStoreActions from './actions';
import * as VideoStoreSelectors from './selectors';

@Injectable()
export class VideoStoreRoutingEffects {
    videoRoutes$ = this.actions$.pipe(
        ofType(RouterStoreActions.routeChanged),
        map(action => {
            if(action.routeDetails.area === RouteArea.videos) {
                return action.routeDetails;
            } else {
                return null;
            }
        })
    );

    navigateToVideo$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(VideoStoreActions.navigateToVideo),
            map(action => this.routeBuilderService.videoCategoriesAbs(action.categoryId, action.videoId)),
            tap(url => this.router.navigateByUrl(url))
        );
    }, { dispatch: false });

    setActiveVideoFromRoute = createEffect(() => {
        return combineLatest([
            this.actions$.pipe(ofType(RouterStoreActions.routeChanged)),
            this.store.select(VideoStoreSelectors.allEntities),
            this.store.select(VideoStoreSelectors.allIds)
        ]).pipe(
            filter(([action, entities, ids]) => {
                return action.routeDetails.area === RouteArea.videos &&
                    !!entities &&
                    !!ids &&
                    ids.length > 0;
            }),
            map(([action, entities, ids]) => {
                const categoryId = Number(action.routeDetails.params.categoryId);
                const videoId = Number(action.routeDetails.params.videoId);

                // if invalid video id or is not present in url, go to first
                if (isNaN(videoId) || !(videoId in entities)) {
                    return VideoStoreActions.navigateToVideo({
                        categoryId,
                        videoId: ids[0] as number
                    });
                } else {
                    return VideoStoreActions.setActiveVideoId({ id: videoId });
                }
            })
        );
    });

    loadVideosWhenEnteringVideoArea$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(RouterStoreActions.routeAreaEntering),
            filter(action => action.enteringArea === RouteArea.videos),
            map(action => VideoStoreActions.loadRequest({ categoryId: action.enteringRouteDetails?.params?.categoryId }))
        );
    });

    monitorWhenLeavingVideoArea$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(RouterStoreActions.routeAreaLeaving),
            filter(action => action.leavingArea === RouteArea.videos),
            map(area => VideoStoreActions.exitVideoArea())
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
