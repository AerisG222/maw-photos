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

@Injectable()
export class RouterStoreEffects {
    routeChanged$ = this.actions$.pipe(
        ofType(ROUTER_NAVIGATED),
        withLatestFrom(this.store.select(RouterStoreSelectors.selectRouteDetails))
    );

    routeAreaChanged$ = this.routeChanged$.pipe(
        map(([action, currentRouteDetails]) => currentRouteDetails),
        scan((acc: RouteDetailsChange, curr) => {
            return { previous: acc?.current, current: curr };
        }, { previous: null, current: null}),
        filter(change => change.previous?.area !== change.current?.area)
    );

    monitorRouteChangedEffect$ = createEffect(() => {
        return this.routeChanged$.pipe(
            map(([action, routeDetails]) => RouterStoreActions.routeChanged({ routeDetails }))
        );
    });

    monitorRouteAreaChangeEffect$ = createEffect(() => {
        return this.routeAreaChanged$
            .pipe(
                map(change => RouterStoreActions.routeAreaChanged({
                    leavingArea: change.previous?.area ?? RouteArea.unknown,
                    leavingRouteDetails: change.previous,
                    enteringArea: change.current?.area ?? RouteArea.unknown,
                    enteringRouteDetails: change.current
                }))
            );
        });

    monitorRouteAreaEnterEffect$ = createEffect(() => {
        return this.routeAreaChanged$
            .pipe(
                map(change => RouterStoreActions.routeAreaEntering({
                    enteringArea: change.current?.area ?? RouteArea.unknown,
                    enteringRouteDetails: change.current
                }))
            );
        });

    monitorRouteAreaLeaveEffect$ = createEffect(() => {
        return this.routeAreaChanged$
            .pipe(
                filter(change => !!change?.previous),
                map(change => RouterStoreActions.routeAreaLeaving({
                    leavingArea: change.previous?.area ?? RouteArea.unknown,
                    leavingRouteDetails: change.previous
                }))
            );
        });

    constructor(
        private actions$: Actions,
        private store: Store
    ) {

    }
}
