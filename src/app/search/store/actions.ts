import { createAction, props } from '@ngrx/store';

import { SearchResult } from 'src/app/search/models/search-result.model';
import { MultimediaCategory } from 'src/app/search/models/multimedia-category.model';

export const clearRequest = createAction(
    '[Search] Clear'
);

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
