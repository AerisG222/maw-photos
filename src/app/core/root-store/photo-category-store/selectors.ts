import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity';

import { PHOTO_CATEGORY_FEATURE_NAME } from './feature-name';
import { photoCategoryAdapter, State } from './state';
import { Category, PhotoCategory, calculateStats } from '@models';

const photoCategoryState = createFeatureSelector<State>(
    PHOTO_CATEGORY_FEATURE_NAME
);

const { selectAll, selectEntities } = photoCategoryAdapter.getSelectors(
    photoCategoryState
);

export const allCategories = selectAll;
export const allEntities = selectEntities;

export const error = createSelector(
    photoCategoryState,
    (state: State): string | null => state.error
);

export const isLoading = createSelector(
    photoCategoryState,
    (state: State): boolean => state.isLoading
);

export const activeCategoryId = createSelector(
    photoCategoryState,
    (state: State): number | null => state.activeCategoryId
);

export const activeCategory = createSelector(
    selectEntities,
    activeCategoryId,
    (entities, id) => {
        if (id) {
            const cat = entities[id];

            if (cat) {
                return cat;
            }
        }

        return null;
    }
);

export const activeCategoryTeaserUrl = createSelector(
    activeCategory,
    (cat) => cat?.teaserImageSq.url
);

export const activePhotoCategory = createSelector(
    activeCategory,
    (cat) => cat?.actual as PhotoCategory
);

export const allYears = createSelector(selectAll, (categories: Category[]) =>
    [...new Set(categories.map((x) => x.year))].sort()
);

export const categoriesForYear = createSelector(
    selectAll,
    (categories: Category[], props: { year: number }) =>
        categories.filter((cat) => cat.year === props.year)
);

export const categoryById = createSelector(
    selectEntities,
    (entities: Dictionary<Category>, props: { id: number }) =>
        entities[props.id] ?? null
);

export const totalStats = createSelector(
    allYears,
    selectAll,
    (years, categories) => calculateStats(years, categories)
);
