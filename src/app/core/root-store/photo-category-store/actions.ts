import { createAction, props } from '@ngrx/store';

import { Category } from 'src/app/models/category.model';

export const loadRequest = createAction(
    '[Photo Categories] Load Request'
);

export const loadFailure = createAction(
    '[Photo Categories] Load Failure',
    props<{ error: string }>()
);

export const loadSuccess = createAction(
    '[Photo Categories] Load Success',
    props<{ categories: Category[] }>()
);

export const loadRequestedSatisfiedByCache = createAction(
    '[Photo Categories] Load Request Satisfied by Cache'
);

export const setActiveCategoryId = createAction(
    '[Photo Categories] Set Active Category Id',
    props<{ categoryId: number | null }>()
);

export const setTeaserRequest = createAction(
    '[Photo Categories] Set Teaser Request',
    props<{ categoryId: number; photoId: number }>()
);

export const setTeaserFailure = createAction(
    '[Photo Categories] Set Teaser Failure',
    props<{ error: string }>()
);

export const setTeaserSuccess = createAction(
    '[Photo Categories] Set Teaser Success',
    props<{ category: Category }>()
);

export const setIsMissingGpsData = createAction(
    '[Photo Categories] Set Is Missing GPS Data Request',
    props<{ categoryId: number; isMissingGpsData: boolean }>()
);
