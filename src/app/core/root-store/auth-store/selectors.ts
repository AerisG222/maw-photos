import { createFeatureSelector, createSelector } from '@ngrx/store';

import { State } from './state';
import { AUTH_FEATURE_NAME } from './feature-name';

const authState = createFeatureSelector<State>(AUTH_FEATURE_NAME);

export const selectUserInfo = createSelector(authState, (state) => state.auth);

export const selectFirstName = createSelector(selectUserInfo, (u) => u?.firstName);

export const selectLastName = createSelector(selectUserInfo, (u) => u?.lastName);

export const selectUsername = createSelector(selectUserInfo, (u) => u?.username);

export const selectRoles = createSelector(selectUserInfo, (u) => {
    if(u === null || u === undefined) {
        return [];
    }

    if(Array.isArray(u.roles)) {
        return u.roles;
    }

    return [u.roles];
});

export const selectIsAdmin = createSelector(
    selectRoles,
    (userRoles) => !!userRoles.find((r) => r === 'admin')
);
