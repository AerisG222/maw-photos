import { createAction, props } from '@ngrx/store';

export const selectYear = createAction(
    '[Stats] Select Year',
    props<{ year: number}>()
);

export const selectAggregateBy = createAction(
    '[Stats] Aggregate By',
    props<{ agg: string }>()
);
