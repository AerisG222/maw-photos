import { createAction, props } from '@ngrx/store';

import { VideoCategory } from 'src/app/core/models/video-category.model';

export const loadRequest = createAction(
    '[Video Categories] Load Request'
);

export const loadFailure = createAction(
    '[Video Categories] Load Failure',
    props<{ error: string }>()
);

export const loadSuccess = createAction(
    '[Video Categories] Load Success',
    props<{ categories: VideoCategory[] }>()
);

export const setCurrent = createAction(
    '[Video Categories] Set Current',
    props<{ category: VideoCategory }>()
);

export const setCurrentById = createAction(
    '[Video Categories] Set Current By Id',
    props<{ categoryId: number }>()
);
