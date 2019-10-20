import { createReducer, on, Action } from '@ngrx/store';

import * as PhotoCategoryActions from './actions';
import { photoCategoryAdapter, initialState, State } from './state';

const reducer = createReducer(
    initialState,
    on(PhotoCategoryActions.loadRequest, state => ({
        ...state,
        isLoading: true,
        error: null
    })),
    on(PhotoCategoryActions.loadSuccess, (state, { categories }) => (
        photoCategoryAdapter.addMany(categories, {
            ...state,
            isLoading: false,
            error: null
        })
    )),
    on(PhotoCategoryActions.loadFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error
    })),
    on(PhotoCategoryActions.setCurrent, (state, { category }) => ({
        ...state,
        currentCategory: category
    })),
    on(PhotoCategoryActions.setCurrentById, (state, { categoryId }) => ({
        ...state,
        currentCategory: state.entities[categoryId]
    }))
);

export function photoCategoryReducer(state: State | undefined, action: Action) {
    return reducer(state, action);
}
