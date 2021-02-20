import { createReducer, on } from '@ngrx/store';

import * as PhotoCategoryActions from './actions';
import { photoCategoryAdapter, initialState, State } from './state';

export const reducer = createReducer(
    initialState,
    on(
        PhotoCategoryActions.loadRequest,
        PhotoCategoryActions.setTeaserRequest,
        (state): State => ({
            ...state,
            isLoading: true,
            error: null,
        })
    ),
    on(
        PhotoCategoryActions.loadSuccess,
        (state, { categories }): State =>
            photoCategoryAdapter.addMany(categories, {
                ...state,
                isLoading: false,
                error: null,
            })
    ),
    on(
        PhotoCategoryActions.loadFailure,
        PhotoCategoryActions.setTeaserFailure,
        (state, { error }): State => ({
            ...state,
            isLoading: false,
            error,
        })
    ),
    on(
        PhotoCategoryActions.loadRequestedSatisfiedByCache,
        (state): State => ({
            ...state,
            isLoading: false,
        })
    ),
    on(
        PhotoCategoryActions.setActiveCategoryId,
        (state, { categoryId }): State => ({
            ...state,
            activeCategoryId: categoryId,
        })
    ),
    on(
        PhotoCategoryActions.setTeaserSuccess,
        (state, { category }): State =>
            photoCategoryAdapter.upsertOne(category, {
                ...state,
                activeCategoryId: category.id,
                isLoading: false,
                error: null,
            })
    ),
    on(
        PhotoCategoryActions.setIsMissingGpsData,
        (state, { categoryId, isMissingGpsData }): State => {
            const catToUpdate = state.entities[categoryId];

            if (catToUpdate) {
                const newCat = {
                    ...catToUpdate,
                    actual: { ...catToUpdate.actual },
                };

                newCat.actual.isMissingGpsData = isMissingGpsData;

                // we should be able to just update the one property, but not sure how to do this given that it is nested
                const update = { id: categoryId, changes: newCat };

                return photoCategoryAdapter.updateOne(update, state);
            }

            return state;
        }
    )
);
