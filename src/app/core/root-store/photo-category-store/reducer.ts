import { createReducer, on, Action } from '@ngrx/store';

import * as PhotoCategoryActions from './actions';
import { photoCategoryAdapter, initialState, State } from './state';
import { PhotoCategory } from '../../models/photo-category.model';
import { CategoryYearFilterComponent } from 'src/app/categories/category-year-filter/category-year-filter.component';

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
        error: null
    })),
    on(PhotoCategoryActions.setTeaserSuccess, (state, { category }) => (
        photoCategoryAdapter.upsertOne(category, {
            ...state,
            currentCategory: category,
            isLoading: false,
            error: null
        })
    )),
    on(PhotoCategoryActions.setTeaserFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error
    }))
);

export function photoCategoryReducer(state: State | undefined, action: Action) {
    return reducer(state, action);
}
