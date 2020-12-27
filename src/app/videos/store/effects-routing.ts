import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { filter, map, tap, withLatestFrom } from 'rxjs/operators';

import { RouterStoreActions, VideoCategoryStoreActions } from 'src/app/core/root-store';
import { RouteArea } from 'src/app/models/route-area';
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

    entering$ = this.actions$.pipe(
        ofType(RouterStoreActions.routeAreaEntering),
        filter(action => action.enteringArea === RouteArea.videos)
    );

    leaving$ = this.actions$.pipe(
        ofType(RouterStoreActions.routeAreaLeaving),
        filter(action => action.leavingArea === RouteArea.videos)
    );

    navigateToVideo$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(VideoStoreActions.navigateToVideo),
            withLatestFrom(this.videoRoutes$),
            filter(routeDetails => !!routeDetails),
            tap(([action, routeDetails]) => this.router.navigateByUrl(`/videos/${ routeDetails?.params.categoryId }/${ action.videoId }`))
        );
    }, { dispatch: false });

    setActiveVideoFromRoute = createEffect(() => {
        return combineLatest([
                this.videoRoutes$,
                this.store.select(VideoStoreSelectors.allEntities),
                this.store.select(VideoStoreSelectors.allIds)
            ])
            .pipe(
                filter(([routeDetails, entities, ids]) => !!routeDetails && !!entities && !!ids && ids.length > 0),
                map(([routeDetails, entities, ids]) => {
                    // if invalid video id or is not present in url, go to first
                    if (!!!routeDetails?.params?.videoId || !(routeDetails.params.videoId in entities)) {
                        return VideoStoreActions.navigateToVideo({ videoId: ids[0] as number });
                    } else {
                        return VideoStoreActions.setActiveVideoId({ id: routeDetails.params.videoId });
                    }
                })
            );
    });

    loadVideosWhenEnteringVideoArea$ = createEffect(() => {
        return this.entering$.pipe(
            withLatestFrom(this.videoRoutes$),
            filter(([action, videoRoute]) => !!videoRoute),
            map(([action, videoRoute]) => VideoStoreActions.loadRequest({ categoryId: videoRoute?.params.categoryId }))
        );
    });

    setActiveCategoryWhenEnteringVideoArea$ = createEffect(() => {
        return this.entering$.pipe(
            withLatestFrom(this.videoRoutes$),
            filter(([action, videoRoute]) => !!videoRoute),
            map(([action, videoRoute]) => VideoCategoryStoreActions.setActiveCategoryId({ categoryId: videoRoute?.params.categoryId }))
        );
    });

    monitorWhenLeavingVideoArea$ = createEffect(() => {
        return this.leaving$.pipe(
            map(area => VideoStoreActions.exitVideoArea())
        );
    });

    constructor(
        private actions$: Actions,
        private store: Store,
        private router: Router
    ) {

    }
}
