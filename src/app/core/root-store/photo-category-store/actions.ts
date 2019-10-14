import { createAction, props } from '@ngrx/store';

import { PhotoCategory } from 'src/app/core/models/photo-category.model';

export const loadRequest = createAction(
    '[Photo Categories] Load Request'
);

export const loadFailure = createAction(
    '[Photo Categories] Load Failure',
    props<{ error: string }>()
);

export const loadSuccess = createAction(
    '[Photo Categories] Load Success',
    props<{ categories: PhotoCategory[] }>()
);

export const setCurrent = createAction(
    '[Photo Categories] Set Current',
    props<{ category: PhotoCategory }>()
);

export const setCurrentById = createAction(
    '[Photo Categories] Set Current By Id',
    props<{ categoryId: number }>()
);
