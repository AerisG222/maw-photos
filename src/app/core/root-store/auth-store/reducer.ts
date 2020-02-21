import { on, createReducer, Action } from '@ngrx/store';

import { initialState, State } from './state';
import { updateUserPropertiesRequest } from './actions';

const reducer = createReducer(
    initialState,
    on(updateUserPropertiesRequest, (state, { userSettings }) => ({
        ...state,
        auth: userSettings
    }))
);

export function authReducer(state: State | undefined, action: Action) {
    return reducer(state, action);
}
