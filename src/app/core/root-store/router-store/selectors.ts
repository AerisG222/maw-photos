import { Params } from '@angular/router';
import * as fromRouter from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MinimalRouterStateSnapshot } from '@ngrx/router-store';

import { RouteHelper, RouteDetails, RouteArea, PhotoViewMode } from '@models';

export const routerState = createFeatureSelector<
    fromRouter.RouterReducerState<MinimalRouterStateSnapshot>
>('router');

export const {
    selectCurrentRoute,
    selectFragment,
    selectQueryParams,
    selectQueryParam,
    selectRouteParams,
    selectRouteParam,
    selectRouteData,
    selectUrl,
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

export const selectRouteNestedParam = (param: string): Params | null => {
    return createSelector(
        selectRouteNestedParams,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        (params) => params && params[param]
    );
};

export const selectRouteDetails = createSelector(
    selectUrl,
    selectFragment,
    selectRouteNestedParams,
    selectQueryParams,
    selectRouteData,
    (url, fragment, params, queryParams, data): RouteDetails => {
        return {
            area: RouteHelper.getArea(url),
            url,
            fragment: fragment ?? null,
            params,
            queryParams,
            data,
        };
    }
);

export const inCategoryArea = createSelector(selectRouteDetails, (details) => {
    if (details) {
        return (
            details.area === RouteArea.categories ||
            details.area === RouteArea.photos ||
            details.area === RouteArea.videos
        );
    }

    return false;
});

export const inPhotosArea = createSelector(
    selectRouteDetails,
    (details) => details.area === RouteArea.photos
);

export const inRandomArea = createSelector(
    selectRouteDetails,
    (details) => details.area === RouteArea.random
);

export const isPhotosDetailView = createSelector(
    inPhotosArea,
    selectRouteData,
    (isPhotos, data) => isPhotos && data?.view === RouteHelper.photoViewDetail
);

export const isPhotosMapView = createSelector(
    inPhotosArea,
    selectRouteData,
    (isPhotos, data) => isPhotos && data?.view === RouteHelper.photoViewMap
);

export const currentViewMode = createSelector(
    selectRouteData,
    (data) => (data?.view as PhotoViewMode) ?? RouteHelper.photoViewDefault
);
