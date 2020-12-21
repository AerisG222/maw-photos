import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity';

import { PHOTO_CATEGORY_FEATURE_NAME } from './feature-name';
import { photoCategoryAdapter, State } from './state';
import { Category } from 'src/app/models/category.model';

const photoCategoryState = createFeatureSelector<State>(PHOTO_CATEGORY_FEATURE_NAME);

export const { selectAll, selectEntities } = photoCategoryAdapter.getSelectors(photoCategoryState);

export const selectAllCategories = selectAll;

export const selectPhotoCategoryError = createSelector(
    photoCategoryState,
    (state: State): string | null => state.error
);

export const selectPhotoCategoryIsLoading = createSelector(
    photoCategoryState,
    (state: State): boolean => state.isLoading
);

export const selectActiveCategoryId = createSelector(
    photoCategoryState,
    (state: State): number | null => state.activeCategoryId
);

export const selectActiveCategory = createSelector(
    selectEntities,
    selectActiveCategoryId,
    (entities, id) => {
        if (!!id) {
            const cat = entities[id];

            if (!!cat) {
                return cat;
            }
        }

        return null;
    }
);

export const selectAllYears = createSelector(
    selectAll,
    (categories: Category[]) => [...new Set(categories.map(x => x.year))].sort()
);

export const selectCategoriesForYear = createSelector(
    selectAll,
    (categories: Category[], props: {year: number}) => categories.filter(cat => cat.year === props.year)
);

export const selectCategoryById = createSelector(
    selectEntities,
    (entities: Dictionary<Category>, props: {id: number}) => entities[props.id] ?? null
);
