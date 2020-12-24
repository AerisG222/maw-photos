import { createAction, props } from '@ngrx/store';
import { RouteDetails } from 'src/app/models/route-details.model';

export const routeAreaChanged = createAction(
    '[Router] Area Changed',
    props<{ previous: RouteDetails, current: RouteDetails }>()
);
