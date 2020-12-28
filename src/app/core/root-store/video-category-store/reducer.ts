import { createReducer, on } from '@ngrx/store';

import { videoCategoryAdapter, initialState, State } from './state';
import * as VideoCategoryActions from './actions';

export const reducer = createReducer(
    initialState,
    on(VideoCategoryActions.loadRequest, (state): State => ({
        ...state,
        isLoading: true,
        error: null
    })),
    on(VideoCategoryActions.loadSuccess, (state, { categories }): State =>
        videoCategoryAdapter.addMany(categories, {
            ...state,
            isLoading: false,
            error: null
        })
    ),
    on(VideoCategoryActions.loadFailure, (state, { error }): State => ({
        ...state,
        isLoading: false,
        error
    })),
    on(VideoCategoryActions.loadRequestedSatisfiedByCache, (state): State => ({
        ...state,
        isLoading: false
    })),
    on(VideoCategoryActions.setActiveCategoryId, (state, { categoryId }): State => ({
        ...state,
        activeCategoryId: categoryId
    })),
    on(VideoCategoryActions.setTeaserRequest, (state): State => ({
        ...state,
        isLoading: true,
        error: null
    })),
    on(VideoCategoryActions.setTeaserSuccess, (state, { category }): State => (
        videoCategoryAdapter.upsertOne(category, {
            ...state,
            activeCategoryId: category.id,
            isLoading: false,
            error: null
        })
    )),
    on(VideoCategoryActions.setTeaserFailure, (state, { error }): State => ({
        ...state,
        isLoading: false,
        error
    })),
    on(VideoCategoryActions.setIsMissingGpsData, (state, { categoryId, isMissingGpsData }): State => {
        const catToUpdate = state.entities[categoryId];

        if (!!catToUpdate) {
            const newCat = {
                ...catToUpdate,
                actual: { ...catToUpdate.actual }
            };

            newCat.actual.isMissingGpsData = isMissingGpsData;

            // we should be able to just update the one property, but not sure how to do this given that it is nested
            const update = { id: categoryId, changes: newCat};

            return videoCategoryAdapter.updateOne(update, state);
        }

        return state;
    })
);
