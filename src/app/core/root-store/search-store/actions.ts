import { createAction, props } from '@ngrx/store';

import { SearchResult } from '../../models/search/search-result.model';
import { MultimediaCategory } from '../../models/search/multimedia-category.model';

export const clearRequest = createAction(
    '[Search] Clear'
);

export const queryRequest = createAction(
    '[Search] Query Reqeust',
    props<{ query: string }>()
);

export const queryFailure = createAction(
    '[Search] Query Failure',
    props<{ error: string }>()
);

export const querySuccess = createAction(
    '[Search] Query Success',
    props<{ result: SearchResult<MultimediaCategory> }>()
);
