import { createReducer, on } from '@ngrx/store';

import * as PhotoCategoryActions from './actions';
import { photoCategoryAdapter, initialState } from './state';

export const photoCategoryReducer = createReducer(
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
