import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { filter, map, withLatestFrom } from 'rxjs/operators';

import {
    RouterStoreActions,
    SettingsStoreActions,
    SettingsStoreSelectors,
} from '@core/root-store';
import { CategoryViewMode, RouteArea } from '@models';
import * as SearchStoreActions from './actions';
import { Store } from '@ngrx/store';

@Injectable()
export class SearchStoreRoutingEffects {
    monitorWhenLeavingRandomArea$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(RouterStoreActions.routeAreaLeaving),
            filter((action) => action.leavingArea === RouteArea.search),
            map(() => SearchStoreActions.exitSearchArea())
        );
    });

    monitorViewChangedEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(RouterStoreActions.routeChanged),
            withLatestFrom(
                this.store.select(SettingsStoreSelectors.searchPageSettings)
            ),
            filter(([action, pageSettings]) => {
                if (action.routeDetails.data.view) {
                    return (
                        action.routeDetails.area === RouteArea.search &&
                        action.routeDetails.data.view !== pageSettings.viewMode
                    );
                }
                return false;
            }),
            map(([action, pageSettings]) => {
                const newSettings = {
                    ...pageSettings,
                    viewMode: action.routeDetails.data.view as CategoryViewMode,
                };

                return SettingsStoreActions.saveSearchPageSettings({
                    settings: newSettings,
                });
            })
        );
    });

    constructor(private actions$: Actions, private store: Store) {}
}
