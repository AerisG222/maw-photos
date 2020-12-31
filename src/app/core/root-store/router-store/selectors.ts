import { Params } from '@angular/router';
import * as fromRouter from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MinimalRouterStateSnapshot } from '@ngrx/router-store';

import { RouteDetails } from 'src/app/models/route-details.model';
import { RouteArea } from 'src/app/models/route-area';
import { RouteHelperService } from '../../services/route-helper.service';

export const routerState = createFeatureSelector<fromRouter.RouterReducerState<MinimalRouterStateSnapshot>>('router');

export const {
    selectCurrentRoute,   // select the current route
    selectFragment,       // select the current route fragment
    selectQueryParams,    // select the current route query params
    selectQueryParam,     // factory function to select a query param
    selectRouteParams,    // select the current route params
    selectRouteParam,     // factory function to select a route param
    selectRouteData,      // select the current route data
    selectUrl,            // select the current url
} = fromRouter.getSelectors(routerState);

// https://ngrx.io/guide/router-store/selectors
export const selectRouteNestedParams = createSelector(routerState, (router) => {
    let currentRoute = router?.state?.root;
    let params: Params = {};

    while (currentRoute?.firstChild) {
        currentRoute = currentRoute.firstChild;
        params = {
            ...params,
            ...currentRoute.params,
        };
    }

    return params;
});

export const selectRouteNestedParam = (param: string) => {
    return createSelector(selectRouteNestedParams, (params) => params && params[param]);
};

export const selectRouteDetails = createSelector(
    selectUrl,
    selectFragment,
    selectRouteNestedParams,
    selectRouteData,
    (url, fragment, params, data): RouteDetails => {
        // TODO: is there a way to have this injected?
        const routeHelperService = new RouteHelperService();

        return {
            area: routeHelperService.getArea(url),
            url,
            fragment: fragment ?? null,
            params,
            data
        };
    }
);

export const isRandomView = createSelector(
    selectRouteDetails,
    details => details.area === RouteArea.random
);
