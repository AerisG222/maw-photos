import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, map, switchMap } from 'rxjs/operators';

import { RouterStoreActions, RouterStoreSelectors } from '@core/root-store';
import { RouteArea, RouteHelper } from '@models';
import * as VideoStoreActions from './actions';
import * as VideoStoreSelectors from './selectors';

@Injectable()
export class VideoStoreRoutingEffects {
    videoRoutes$ = this.actions$.pipe(
        ofType(RouterStoreActions.routeChanged),
        map((action) => {
            if (action.routeDetails.area === RouteArea.videos) {
                return action.routeDetails;
            } else {
                return null;
            }
        })
    );

    navigateToVideo$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(VideoStoreActions.navigateToVideo),
                map((action) =>
                    RouteHelper.videoCategoriesAbs(
                        action.categoryId,
                        action.videoId
                    )
                ),
                switchMap((url) => this.router.navigateByUrl(url))
            );
        },
        { dispatch: false }
    );

    setActiveVideoFromRoute = createEffect(() => {
        return this.actions$.pipe(
            ofType(
                RouterStoreActions.routeChanged,
                VideoStoreActions.loadSuccess
            ),
            concatLatestFrom(() => [
                this.store.select(RouterStoreSelectors.selectRouteDetails),
                this.store.select(VideoStoreSelectors.allEntities),
                this.store.select(VideoStoreSelectors.allIds),
            ]),
            filter(([, routeDetails, entities, ids]) => {
                return routeDetails.area === RouteArea.videos &&
                    !!entities &&
                    !!ids?.length
            }),
            map(([, routeDetails, entities, ids]) => {
                const categoryId = Number(routeDetails.params.categoryId);
                const videoId = Number(routeDetails.params.videoId);

                // if invalid video id or is not present in url, go to first
                if (isNaN(videoId) || !(videoId in entities)) {
                    return VideoStoreActions.navigateToVideo({
                        categoryId,
                        videoId: ids[0] as number,
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
            filter((action) => action.enteringArea === RouteArea.videos),
            map((action) =>
                VideoStoreActions.loadRequest({
                    categoryId: action.enteringRouteDetails?.params
                        ?.categoryId as number,
                })
            )
        );
    });

    monitorWhenLeavingVideoArea$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(RouterStoreActions.routeAreaLeaving),
            filter((action) => action.leavingArea === RouteArea.videos),
            map(() => VideoStoreActions.exitVideoArea())
        );
    });

    constructor(
        private actions$: Actions,
        private store: Store,
        private router: Router
    ) {}
}
