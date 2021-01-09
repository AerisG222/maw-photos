import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { filter, map } from 'rxjs/operators';

import { RouterStoreActions } from '@core/root-store';
import { RouteArea } from '@models/route-area';
import * as SearchStoreActions from './actions';

@Injectable()
export class SearchStoreRoutingEffects {
    monitorWhenLeavingRandomArea$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(RouterStoreActions.routeAreaLeaving),
            filter(action => action.leavingArea === RouteArea.search),
            map(area => SearchStoreActions.exitSearchArea())
        );
    });

    constructor(
        private actions$: Actions
    ) {

    }
}
