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
    firstVideo$ = this.store.select(VideoStoreSelectors.firstVideo);
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
                this.firstVideo$
            ])
            .pipe(
                filter(([ routeDetails, firstVideo ]) => !!!routeDetails.params.videoId && !!firstVideo),
                map(([ routeDetails, firstVideo ]) => VideoStoreActions.navigateToFirstVideo({ videoId: (firstVideo as Video).id }))
            );
    });

    navigateToFirstVideo$ = createEffect(() => {
        return this.actions$.pipe (
            ofType(VideoStoreActions.navigateToFirstVideo),
            withLatestFrom(this.videoRoutes$),
            tap(([action, routeDetails]) => this.router.navigateByUrl(`${ routeDetails.url }/${ action.videoId }`))
        );
    }, { dispatch: false });

    setActiveVideoFromRoute = createEffect(() => {
        return this.videoRoutes$
            .pipe(
                filter(routeDetails => !!routeDetails.params.videoId),
                map(routeDetails => VideoStoreActions.setActiveVideoId({ id: routeDetails.params.videoId }))
            );
    });

    unsetActiveVideoWhenLeavingArea$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(RouterStoreActions.routeAreaLeaving),
            filter(action => action.leavingArea === RouteArea.videos),
            map(area => VideoStoreActions.unsetActiveVideoId())
        );
    });

    clearVideosWhenLeavingArea$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(RouterStoreActions.routeAreaLeaving),
            filter(action => action.leavingArea === RouteArea.videos),
            map(area => VideoStoreActions.clearRequest())
        );
    });

    constructor(
        private actions$: Actions,
        private store: Store,
        private router: Router
    ) {

    }
}
