import { on, createReducer, Action, ActionReducer } from '@ngrx/store';

import { initialState, State } from './state';
import { updateUserInfoRequest } from './actions';

const reducer = createReducer(
    initialState,
    on(updateUserInfoRequest, (state, { userInfo }) => ({
        ...state,
        auth: userInfo
    }))
);

export function authReducer(state: State | undefined, action: Action): State {
    return reducer(state, action);
}
