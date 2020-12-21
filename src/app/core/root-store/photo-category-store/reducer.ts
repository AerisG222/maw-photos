import { createReducer, on } from '@ngrx/store';

import * as PhotoCategoryActions from './actions';
import { photoCategoryAdapter, initialState } from './state';
import { getIdsByYear } from '../category-helpers';

export const reducer = createReducer(
    initialState,
    on(PhotoCategoryActions.loadRequest, state => ({
        ...state,
        isLoading: true,
        error: null
    })),
    on(PhotoCategoryActions.loadSuccess, (state, { categories }) =>
        photoCategoryAdapter.addMany(categories, {
            ...state,
            categoryIdsByYear: getIdsByYear(categories),
            isLoading: false,
            error: null
        })
    ),
    on(PhotoCategoryActions.loadFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error
    })),
    on(PhotoCategoryActions.loadRequestedSatisfiedByCache, state => ({
        ...state,
        isLoading: false
    })),
    on(PhotoCategoryActions.setActiveCategoryId, (state, { categoryId }) => ({
        ...state,
        activeCategoryId: categoryId
    })),
    on(PhotoCategoryActions.setTeaserRequest, state => ({
        ...state,
        isLoading: true,
        error: null
    })),
    on(PhotoCategoryActions.setTeaserSuccess, (state, { category }) => (
        photoCategoryAdapter.upsertOne(category, {
            ...state,
            activeCategoryId: category.id,
            isLoading: false,
            error: null
        })
    )),
    on(PhotoCategoryActions.setTeaserFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error
    })),
    on(PhotoCategoryActions.setIsMissingGpsData, (state, { categoryId, isMissingGpsData }) => {
        const catToUpdate = state.entities[categoryId];

        if (!!catToUpdate) {
            const newCat = {
                ...catToUpdate,
                actual: { ...catToUpdate.actual }
            };

            newCat.actual.isMissingGpsData = isMissingGpsData;

            // we should be able to just update the one property, but not sure how to do this given that it is nested
            const update = { id: categoryId, changes: newCat};

            return photoCategoryAdapter.updateOne(update, state);
        }

        return state;
    })
);
