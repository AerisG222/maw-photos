import { createAction, props } from '@ngrx/store';

import { RouteArea } from 'src/app/models/route-area';
import { RouteDetails } from 'src/app/models/route-details.model';

export const routeChanged = createAction(
    '[Router] Route Changed',
    props<{ routeDetails: RouteDetails }>()
);

export const routeAreaChanged = createAction(
    '[Router] Area Changed',
    props<{ leavingArea: RouteArea; enteringArea: RouteArea}>()
);

export const routeAreaEntering = createAction(
    '[Router] Area Entering',
    props<{ enteringArea: RouteArea }>()
);

export const routeAreaLeaving = createAction(
    '[Router] Area Leaving',
    props<{ leavingArea: RouteArea }>()
);
