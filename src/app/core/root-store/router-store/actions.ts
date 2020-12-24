import { createAction, props } from '@ngrx/store';

import { RouteArea } from 'src/app/models/route-area';

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
