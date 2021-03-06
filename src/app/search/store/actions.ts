import { createAction, props } from '@ngrx/store';

import { MultimediaCategory, SearchResult } from '../models';

export const clearRequest = createAction('[Search] Clear');

export const queryRequest = createAction(
    '[Search] Query Request',
    props<{ query: string; start: number }>()
);

export const queryFailure = createAction(
    '[Search] Query Failure',
    props<{ error: string }>()
);

export const querySuccess = createAction(
    '[Search] Query Success',
    props<{ query: string; result: SearchResult<MultimediaCategory> }>()
);

export const queryMoreRequest = createAction(
    '[Search] Query More Request',
    props<{ query: string; start: number }>()
);

export const queryMoreFailure = createAction(
    '[Search] Query More Failure',
    props<{ error: string }>()
);

export const queryMoreSuccess = createAction(
    '[Search] Query More Success',
    props<{ query: string; result: SearchResult<MultimediaCategory> }>()
);

export const exitSearchArea = createAction('[Search] Exiting Search Area');
