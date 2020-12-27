import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, map, scan, withLatestFrom } from 'rxjs/operators';

import * as RouterStoreActions from './actions';
import * as RouterStoreSelectors from './selectors';
import { RouteDetails } from 'src/app/models/route-details.model';
import { RouteArea } from 'src/app/models/route-area';
import { ROUTER_NAVIGATED } from '@ngrx/router-store';

interface RouteDetailsChange {
    previous: RouteDetails | null;
    current: RouteDetails | null;
}

// TODO: revisit if to see if we nee dto make better distinction of entering vs entered / etc
//       for example, we currently load videos for a category when the route details say we are in the video area and there are no videos
//       however, should we instead look for the enter video area action and just load, regardless of the allVideos selector?
@Injectable()
export class RouterStoreEffects {
    routeChanged$ = this.actions$.pipe(
        ofType(ROUTER_NAVIGATED),
        withLatestFrom(this.store.select(RouterStoreSelectors.selectRouteDetails))
    );

    routeAreaChange$ = this.routeChanged$.pipe(
        map(([action, currentRouteDetails]) => currentRouteDetails),
        scan((acc: RouteDetailsChange, curr) => {
            if(!!curr.url) {
                return { previous: acc?.current, current: curr };
            } else {
                // url can be undefined when cancelling, in this case, we do not update our details
                // as we do not want to fire any enter/leave events in this scenario
                return acc;
            }
        }, { previous: null, current: null}),
        filter(change => change.previous?.area !== change.current?.area)
    );

    monitorRouteChangedEffect$ = createEffect(() => {
        return this.routeChanged$.pipe(
            map(([action, routeDetails]) => RouterStoreActions.routeChanged({ routeDetails }))
        );
    });

    monitorRouteAreaChangeEffect$ = createEffect(() => {
        return this.routeAreaChange$
            .pipe(
                map(change => RouterStoreActions.routeAreaChanged({
                    leavingArea: change.previous?.area ?? RouteArea.unknown,
                    enteringArea: change.current?.area ?? RouteArea.unknown
                }))
            );
        });

    monitorRouteAreaEnterEffect$ = createEffect(() => {
        return this.routeAreaChange$
            .pipe(
                map(change => RouterStoreActions.routeAreaEntering({
                    enteringArea: change.current?.area ?? RouteArea.unknown
                }))
            );
        });

    monitorRouteAreaLeaveEffect$ = createEffect(() => {
        return this.routeAreaChange$
            .pipe(
                filter(change => !!change?.previous),
                map(change => RouterStoreActions.routeAreaLeaving({
                    leavingArea: change.previous?.area ?? RouteArea.unknown
                }))
            );
        });

    constructor(
        private actions$: Actions,
        private store: Store
    ) {

    }
}
