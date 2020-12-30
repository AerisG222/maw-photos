import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity';

import { VIDEO_CATEGORY_FEATURE_NAME } from './feature-name';
import { videoCategoryAdapter, State } from './state';
import { Category } from 'src/app/models/category.model';

export const videoCategoryState = createFeatureSelector<State>(VIDEO_CATEGORY_FEATURE_NAME);

const { selectAll, selectEntities } = videoCategoryAdapter.getSelectors(videoCategoryState);

export const allCategories = selectAll;
export const allEntities = selectEntities;

export const videoCategoryError = createSelector(
    videoCategoryState,
    (state: State): string | null => state.error
);

export const videoCategoryIsLoading = createSelector(
    videoCategoryState,
    (state: State): boolean => state.isLoading
);

export const activeCategoryId = createSelector(
    videoCategoryState,
    (state: State): number | null => state.activeCategoryId
);

export const activeCategory = createSelector(
    selectEntities,
    activeCategoryId,
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

export const activeCategoryTeaserUrl = createSelector(
    activeCategory,
    cat => cat?.teaserImageSq.url
);

export const allYears = createSelector(
    selectAll,
    (categories: Category[]) => [...new Set(categories.map(x => x.year))].sort()
);

export const categoriesForYear = createSelector(
    selectAll,
    (categories: Category[], props: {year: number}) => categories.filter(cat => cat.year === props.year)
);

export const categoryById = createSelector(
    selectEntities,
    (entities: Dictionary<Category>, props: {id: number}) => entities[props.id] ?? null
);
