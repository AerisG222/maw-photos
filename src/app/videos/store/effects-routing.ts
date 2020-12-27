import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { filter, map, tap, withLatestFrom } from 'rxjs/operators';

import { RouterStoreActions, RouterStoreSelectors, VideoCategoryStoreActions } from 'src/app/core/root-store';
import { RouteArea } from 'src/app/models/route-area';
import { Video } from 'src/app/models/video.model';
import * as VideoStoreActions from './actions';
import * as VideoStoreSelectors from './selectors';


@Injectable()
export class VideoStoreRoutingEffects {
    videoRoutes$ = this.store
        .select(RouterStoreSelectors.selectRouteDetails)
        .pipe(
            filter(details => details.area === RouteArea.videos)
        );

    loadVideosForCategoryWhenNavigatingToVideoCategoryScreen$ = createEffect(() => {
        return this.videoRoutes$
            .pipe(
                withLatestFrom(this.store.select(VideoStoreSelectors.allVideos)),
                filter(([ routeDetails, allVideos ]) => !!!allVideos || allVideos.length === 0),
                map(([ routeDetails, allVideos ]) => VideoStoreActions.loadRequest({ categoryId: routeDetails.params.categoryId }))
            );
    });

    setActiveCategoryWhenNavigatingToVideoCategoryScreen$ = createEffect(() => {
        return this.videoRoutes$
            .pipe(
                map(routeDetails => VideoCategoryStoreActions.setActiveCategoryId({ categoryId: routeDetails.params.categoryId }))
            );
    });

    navigateToFirstVideoIfNotInRoute$ = createEffect(() => {
        return combineLatest([
                this.videoRoutes$,
                this.store.select(VideoStoreSelectors.firstVideo)
            ])
            .pipe(
                filter(([ routeDetails, firstVideo ]) => !!!routeDetails.params.videoId && !!firstVideo),
                map(([ routeDetails, firstVideo ]) => VideoStoreActions.navigateToVideo({ videoId: (firstVideo as Video).id }))
            );
    });

    navigateToVideo$ = createEffect(() => {
        return this.actions$.pipe (
            ofType(VideoStoreActions.navigateToVideo),
            withLatestFrom(this.videoRoutes$),
            tap(([action, routeDetails]) => this.router.navigateByUrl(`/videos/${ routeDetails.params.categoryId }/${ action.videoId }`))
        );
    }, { dispatch: false });

    setActiveVideoFromRoute = createEffect(() => {
        return combineLatest([
                this.videoRoutes$,
                this.store.select(VideoStoreSelectors.allEntities),
                this.store.select(VideoStoreSelectors.allIds)
            ])
            .pipe(
                filter(([routeDetails, entities, ids]) => !!routeDetails.params.videoId && !!entities && !!ids && ids.length > 0),
                map(([routeDetails, entities, ids]) => {
                    if (routeDetails.params.videoId in entities) {
                        return VideoStoreActions.setActiveVideoId({ id: routeDetails.params.videoId });
                    } else {
                        return VideoStoreActions.navigateToVideo({ videoId: ids[0] as number });
                    }
                })
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
        private router: Router
    ) {

    }
}
