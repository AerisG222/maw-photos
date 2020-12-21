import { createReducer, on } from '@ngrx/store';

import { VideoCategoryAdapter, initialState } from './state';
import * as VideoCategoryActions from './actions';
import { getIdsByYear } from '../category-helpers';

export const reducer = createReducer(
    initialState,
    on(VideoCategoryActions.loadRequest, state => ({
        ...state,
        isLoading: true,
        error: null
    })),
    on(VideoCategoryActions.loadSuccess, (state, { categories }) =>
        VideoCategoryAdapter.addMany(categories, {
            ...state,
            categoryIdsByYear: getIdsByYear(categories),
            isLoading: false,
            error: null
        })
    ),
    on(VideoCategoryActions.loadFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error
    })),
    on(VideoCategoryActions.loadRequestedSatisfiedByCache, state => ({
        ...state,
        isLoading: false
    })),
    on(VideoCategoryActions.setActiveCategoryId, (state, { categoryId }) => ({
        ...state,
        activeCategoryId: categoryId
    })),
    on(VideoCategoryActions.setTeaserRequest, state => ({
        ...state,
        isLoading: true,
        error: null
    })),
    on(VideoCategoryActions.setTeaserSuccess, (state, { category }) => (
        VideoCategoryAdapter.upsertOne(category, {
            ...state,
            activeCategoryId: category.id,
            isLoading: false,
            error: null
        })
    )),
    on(VideoCategoryActions.setTeaserFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error
    })),
    on(VideoCategoryActions.setIsMissingGpsData, (state, { categoryId, isMissingGpsData }) => {
        const catToUpdate = state.entities[categoryId];

        if (!!catToUpdate) {
            const newCat = {
                ...catToUpdate,
                actual: { ...catToUpdate.actual }
            };

            newCat.actual.isMissingGpsData = isMissingGpsData;

            // we should be able to just update the one property, but not sure how to do this given that it is nested
            const update = { id: categoryId, changes: newCat};

            return VideoCategoryAdapter.updateOne(update, state);
        }

        return state;
    })
);
