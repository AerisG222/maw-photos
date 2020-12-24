import { Injectable } from '@angular/core';
import { createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, map, scan } from 'rxjs/operators';

import * as RouterStoreActions from './actions';
import * as RouterStoreSelectors from './selectors';
import { SettingsService } from '../../services/settings.service';
import { RouteDetails } from 'src/app/models/route-details.model';
import { RouteArea } from 'src/app/models/route-area';

interface RouteDetailsChange {
    previous: RouteDetails | null;
    current: RouteDetails | null;
}

@Injectable()
export class RouterStoreEffects {
    routeAreaChange$ = this.store
        .select(RouterStoreSelectors.selectRouteDetails)
        .pipe(
            scan((acc: RouteDetailsChange, curr) => {
                return { previous: acc?.current, current: curr };
            }, { previous: null, current: null}),
            filter(change => change.previous?.area !== change.current?.area)
        );

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
        private settingsService: SettingsService,
        private store: Store
    ) {

    }
}
