import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, scan, tap } from 'rxjs/operators';

import * as RouterStoreSelectors from './selectors';
import { SettingsService } from '../../services/settings.service';
import { RouteDetails } from 'src/app/models/route-details.model';

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

    monitorRouteAreaEnterEffect$ = createEffect(() => {
        return this.routeAreaChange$
            .pipe(
                tap(change => console.log(`entering ${change.current?.area}`))
            )
        }, { dispatch: false });

    monitorRouteAreaLeaveEffect$ = createEffect(() => {
        return this.routeAreaChange$
            .pipe(
                filter(change => !!change?.previous),
                tap(change => console.log(`leaving ${change.previous?.area}`))
            )
        }, { dispatch: false });

    constructor(
        private settingsService: SettingsService,
        private actions$: Actions,
        private store: Store
    ) {

    }
}
