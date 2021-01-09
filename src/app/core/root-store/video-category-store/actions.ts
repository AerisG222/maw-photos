import { createAction, props } from '@ngrx/store';

import { Category } from '@models/category.model';

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

export const setActiveCategoryId = createAction(
    '[Video Categories] Set Active Category Id',
    props<{ categoryId: number | null }>()
);

export const setTeaserRequest = createAction(
    '[Video Categories] Set Teaser Request',
    props<{ categoryId: number; videoId: number }>()
);

export const setTeaserFailure = createAction(
    '[Video Categories] Set Teaser Failure',
    props<{ error: string }>()
);

export const setTeaserSuccess = createAction(
    '[Video Categories] Set Teaser Success',
    props<{ category: Category }>()
);

export const setIsMissingGpsData = createAction(
    '[Video Categories] Set Is Missing GPS Data Request',
    props<{ categoryId: number; isMissingGpsData: boolean }>()
);
