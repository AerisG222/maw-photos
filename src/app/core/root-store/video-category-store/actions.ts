import { createAction, props } from '@ngrx/store';

import { Category } from 'src/app/models/category.model';

export const loadRequest = createAction(
    '[Video Categories] Load Request'
);

export const loadFailure = createAction(
    '[Video Categories] Load Failure',
    props<{ error: string }>()
);

export const loadSuccess = createAction(
    '[Video Categories] Load Success',
    props<{ categories: Category[] }>()
);

export const loadRequestedSatisfiedByCache = createAction(
    '[Video Categories] Load Request Satisfied by Cache'
);

export const setCurrent = createAction(
    '[Video Categories] Set Current',
    props<{ category: Category }>()
);

export const setCurrentById = createAction(
    '[Video Categories] Set Current By Id',
    props<{ categoryId: number }>()
);

export const setTeaserRequest = createAction(
    '[Video Categories] Set Teaser Request',
    props<{ categoryId: number, videoId: number }>()
);

export const setTeaserFailure = createAction(
    '[Video Categories] Set Teaser Failure',
    props<{ error: string }>()
);

export const setTeaserSuccess = createAction(
    '[Video Categories] Set Teaser Success',
    props<{ category: Category }>()
);
