import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { filter, map } from 'rxjs/operators';

import { RouteArea } from 'src/app/models/route-area';
import { VideoCategoryStoreActions } from '.';
import { RouterStoreActions } from '..';

@Injectable()
export class VideoCategoryStoreRoutingEffects {
    setActiveCategoryWhenEnteringVideoArea$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(RouterStoreActions.routeAreaEntering),
            filter(action => action.enteringArea === RouteArea.videos),
            map(action => VideoCategoryStoreActions.setActiveCategoryId({ categoryId: action.enteringRouteDetails?.params.categoryId }))
        );
    });

    resetActiveCategoryWhenLeavingVideoArea$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(RouterStoreActions.routeAreaLeaving),
            filter(action => action.leavingArea === RouteArea.videos),
            map(action => VideoCategoryStoreActions.setActiveCategoryId({ categoryId: null }))
        );
    });

    constructor(
        private actions$: Actions
    ) {

    }
}
