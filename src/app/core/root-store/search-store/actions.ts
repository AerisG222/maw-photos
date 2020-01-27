import { createAction, props } from '@ngrx/store';

import { SearchResult } from '../../models/search/search-result.model';
import { MultimediaCategory } from '../../models/search/multimedia-category.model';

export const clearRequest = createAction(
    '[Search] Clear'
);

export const queryRequest = createAction(
    '[Search] Query Request',
    props<{ query: string }>()
);

export const queryFailure = createAction(
    '[Search] Query Failure',
    props<{ error: string }>()
);

export const querySuccess = createAction(
    '[Search] Query Success',
    props<{ query: string, result: SearchResult<MultimediaCategory> }>()
);

export const queryNextPageRequest = createAction(
    '[Search] Query Next Page Request',
    props<{ start: number }>()
);

export const queryNextPageFailure = createAction(
    '[Search] Query Next Page Failure',
    props<{ error: string }>()
);

export const queryNextPageSuccess = createAction(
    '[Search] Query Next Page Success',
    props<{ result: SearchResult<MultimediaCategory> }>()
);
