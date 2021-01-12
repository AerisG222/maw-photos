import { createAction, props } from '@ngrx/store';

import { CategoryFilter } from '@models';

export const categoriesYearFilterChanged = createAction(
    '[Categories] Year Filter Changed',
    props<{ filter: number | string }>()
);

export const categoriesTypeFilterChanged = createAction(
    '[Categories] Type Filter Changed',
    props<{ filter: CategoryFilter }>()
);
