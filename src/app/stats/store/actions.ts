import { createAction, props } from '@ngrx/store';

export const selectYear = createAction(
    '[Stats] Select Year',
    props<{ year: number}>()
);
