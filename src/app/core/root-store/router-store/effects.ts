import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ROUTER_NAVIGATED } from '@ngrx/router-store';
import { filter, map, scan, withLatestFrom } from 'rxjs/operators';

import * as RouterStoreActions from './actions';
import * as RouterStoreSelectors from './selectors';
import { RouteDetails, RouteArea, RouteHelper } from '@models';
import { LayoutStoreActions } from '../layout-store';

interface RouteDetailsChange {
    previous: RouteDetails | null;
    current: RouteDetails | null;
}

interface FullScreenChange {
    previousWasFullscreen: boolean;
    currentIsFullscreen: boolean;
}

@Injectable()
export class RouterStoreEffects {
    routeChanged$ = this.actions$.pipe(
        ofType(ROUTER_NAVIGATED),
        withLatestFrom(
            this.store.select(RouterStoreSelectors.selectRouteDetails)
        )
    );

    routeAreaChanged$ = this.routeChanged$.pipe(
        map(([, currentRouteDetails]) => currentRouteDetails),
        scan(
            (acc: RouteDetailsChange, curr) => {
                return { previous: acc?.current, current: curr };
            },
            { previous: null, current: null }
        ),
        filter((change) => change.previous?.area !== change.current?.area)
    );

    monitorRouteChangedEffect$ = createEffect(() => {
        return this.routeChanged$.pipe(
            map(([, routeDetails]) =>
                RouterStoreActions.routeChanged({ routeDetails })
            )
        );
    });

    monitorRouteAreaChangeEffect$ = createEffect(() => {
        return this.routeAreaChanged$.pipe(
            map((change) =>
                RouterStoreActions.routeAreaChanged({
                    leavingArea: change.previous?.area ?? RouteArea.unknown,
                    leavingRouteDetails: change.previous,
                    enteringArea: change.current?.area ?? RouteArea.unknown,
                    enteringRouteDetails: change.current,
                })
            )
        );
    });

    monitorRouteAreaEnterEffect$ = createEffect(() => {
        return this.routeAreaChanged$.pipe(
            map((change) =>
                RouterStoreActions.routeAreaEntering({
                    enteringArea: change.current?.area ?? RouteArea.unknown,
                    enteringRouteDetails: change.current,
                })
            )
        );
    });

    monitorRouteAreaLeaveEffect$ = createEffect(() => {
        return this.routeAreaChanged$.pipe(
            filter((change) => !!change?.previous),
            map((change) =>
                RouterStoreActions.routeAreaLeaving({
                    leavingArea: change.previous?.area ?? RouteArea.unknown,
                    leavingRouteDetails: change.previous,
                })
            )
        );
    });

    monitorFullScreenEffect$ = createEffect(() => {
        return this.routeChanged$.pipe(
            map(([, routeDetails]) =>
                RouteHelper.isFullscreenView(routeDetails)
            ),
            scan(
                (acc: FullScreenChange, curr) => {
                    return {
                        previousWasFullscreen: acc.currentIsFullscreen,
                        currentIsFullscreen: curr,
                    };
                },
                { previousWasFullscreen: false, currentIsFullscreen: false }
            ),
            filter(
                (acc) => acc.currentIsFullscreen !== acc.previousWasFullscreen
            ),
            map(({ currentIsFullscreen }) => {
                return currentIsFullscreen
                    ? LayoutStoreActions.enterFullscreenRequest()
                    : LayoutStoreActions.exitFullscreenRequest();
            })
        );
    });

    constructor(private actions$: Actions, private store: Store) {}
}
