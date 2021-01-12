import { Data, Params } from '@angular/router';
import { RouteArea } from './route-area';

export interface RouteDetails {
    area: RouteArea;
    url: string;
    params: Params;
    data: Data;
    fragment: string | null;
    queryParams: Params | null;
}
