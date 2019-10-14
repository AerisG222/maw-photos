import { createReducer, on } from '@ngrx/store';

import { VideoCategoryAdapter, initialState } from './state';
import * as VideoCategoryActions from './actions';

export const videoCategoryReducer = createReducer(
    initialState,
    on(VideoCategoryActions.loadRequest, state => ({
        ...state,
        isLoading: true,
        error: null
    })),
    on(VideoCategoryActions.loadSuccess, (state, { categories }) =>
        VideoCategoryAdapter.addMany(categories, {
            ...state,
            isLoading: false,
            error: null
        })
    ),
    on(VideoCategoryActions.loadFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error
    })),
    on(VideoCategoryActions.setCurrent, (state, { category }) => ({
        ...state,
        currentCategory: category
    })),
    on(VideoCategoryActions.setCurrentById, (state, { categoryId }) => ({
        ...state,
        currentCategory: state.entities[categoryId]
    }))
);
