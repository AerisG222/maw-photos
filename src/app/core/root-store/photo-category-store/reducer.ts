import { createReducer, on, Action } from '@ngrx/store';

import * as PhotoCategoryActions from './actions';
import { photoCategoryAdapter, initialState, State } from './state';
import { getIdsByYear } from '../category-helpers';

const reducer = createReducer(
    initialState,
    on(PhotoCategoryActions.loadRequest, state => ({
        ...state,
        isLoading: true,
        error: undefined
    })),
    on(PhotoCategoryActions.loadSuccess, (state, { categories }) =>
        photoCategoryAdapter.addMany(categories, {
            ...state,
            categoryIdsByYear: getIdsByYear(categories),
            isLoading: false,
            error: undefined
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
    on(PhotoCategoryActions.setCurrent, (state, { category }) => ({
        ...state,
        currentCategory: category
    })),
    on(PhotoCategoryActions.setCurrentById, (state, { categoryId }) => ({
        ...state,
        currentCategory: state.entities[categoryId]
    })),
    on(PhotoCategoryActions.setTeaserRequest, state => ({
        ...state,
        isLoading: true,
        error: undefined
    })),
    on(PhotoCategoryActions.setTeaserSuccess, (state, { category }) => (
        photoCategoryAdapter.upsertOne(category, {
            ...state,
            currentCategory: category,
            isLoading: false,
            error: undefined
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

export function photoCategoryReducer(state: State | undefined, action: Action): State {
    return reducer(state, action);
}
