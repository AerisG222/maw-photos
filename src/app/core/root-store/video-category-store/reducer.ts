import { createReducer, on, Action } from '@ngrx/store';

import { VideoCategoryAdapter, initialState, State } from './state';
import * as VideoCategoryActions from './actions';
import { getIdsByYear } from '../category-helpers';

const reducer = createReducer(
    initialState,
    on(VideoCategoryActions.loadRequest, state => ({
        ...state,
        isLoading: true,
        error: undefined
    })),
    on(VideoCategoryActions.loadSuccess, (state, { categories }) =>
        VideoCategoryAdapter.addMany(categories, {
            ...state,
            categoryIdsByYear: getIdsByYear(categories),
            isLoading: false,
            error: undefined
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
    on(VideoCategoryActions.setCurrent, (state, { category }) => ({
        ...state,
        currentCategory: category
    })),
    on(VideoCategoryActions.setCurrentById, (state, { categoryId }) => ({
        ...state,
        currentCategory: state.entities[categoryId]
    })),
    on(VideoCategoryActions.setTeaserRequest, state => ({
        ...state,
        isLoading: true,
        error: undefined
    })),
    on(VideoCategoryActions.setTeaserSuccess, (state, { category }) => (
        VideoCategoryAdapter.upsertOne(category, {
            ...state,
            currentCategory: category,
            isLoading: false,
            error: undefined
        })
    )),
    on(VideoCategoryActions.setTeaserFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error
    })),
    on(VideoCategoryActions.setIsMissingGpsData, (state, { categoryId, isMissingGpsData }) => {
        const catToUpdate = state.entities[categoryId];

        const newCat = {
            ...catToUpdate,
            actual: { ...catToUpdate.actual }
        };

        newCat.actual.isMissingGpsData = isMissingGpsData;

        // we should be able to just update the one property, but not sure how to do this given that it is nested
        const update = { id: categoryId, changes: newCat};

        return VideoCategoryAdapter.updateOne(update, state);
    })
);

export function videoCategoryReducer(state: State | undefined, action: Action): State {
    return reducer(state, action);
}
