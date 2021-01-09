import { createAction, props } from '@ngrx/store';

import { RouteArea } from '@models/route-area';
import { RouteDetails } from '@models/route-details.model';

export const routeChanged = createAction(
    '[Router] Route Changed',
    props<{ routeDetails: RouteDetails }>()
);

export const routeAreaChanged = createAction(
    '[Router] Area Changed',
    props<{
        leavingArea: RouteArea;
        leavingRouteDetails: RouteDetails | null;
        enteringArea: RouteArea;
        enteringRouteDetails: RouteDetails | null;
    }>()
);

export const routeAreaEntering = createAction(
    '[Router] Area Entering',
    props<{ enteringArea: RouteArea; enteringRouteDetails: RouteDetails | null }>()
);

export const routeAreaLeaving = createAction(
    '[Router] Area Leaving',
    props<{ leavingArea: RouteArea; leavingRouteDetails: RouteDetails | null }>()
);
