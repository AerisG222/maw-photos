import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity';

import { PHOTO_CATEGORY_FEATURE_NAME } from './feature-name';
import { photoCategoryAdapter, State } from './state';
import { Category, PhotoCategory, TotalStatSummary, YearStatSummary, CategoryStatSummary } from '@models';

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

const calculateStats = (years: number[], categories: Category[]): TotalStatSummary => {
    const result = initTotalSummary(years.length, categories.length);

    for (const cat of categories) {
        const pc = cat.actual as PhotoCategory;

        result.itemCount += pc.photoCount;
        result.size += pc.totalSize;

        populateStatYearSummary(pc, result);
    }

    return result;
};

const populateStatYearSummary = (pc: PhotoCategory, result: TotalStatSummary): void => {
    if(!result.statsByYear.has(pc.year)) {
        result.statsByYear.set(pc.year, initStatYearSummary(pc.year));
    }

    const statYear = result.statsByYear.get(pc.year) as YearStatSummary;

    statYear.categoryCount += 1;
    statYear.itemCount += pc.photoCount;
    statYear.size += pc.totalSize;
    statYear.statsByCategory.push(initCategoryStat(pc));
};

const initTotalSummary = (yearCount: number, categoryCount: number): TotalStatSummary => {
    return {
        yearCount,
        categoryCount,
        itemCount: 0,
        size: 0,
        durationSeconds: 0,
        statsByYear: new Map<number, YearStatSummary>()
    };
};

const initStatYearSummary = (year: number): YearStatSummary => {
    return {
        year,
        categoryCount: 0,
        itemCount: 0,
        size: 0,
        durationSeconds: 0,
        statsByCategory: []
    };
}

const initCategoryStat = (pc: PhotoCategory): CategoryStatSummary => {
    return {
        categoryCount: 1,
        itemCount: pc.photoCount,
        size: pc.totalSize,
        durationSeconds: 0,
        categoryId: pc.id,
        categoryName: pc.name
    };
};
