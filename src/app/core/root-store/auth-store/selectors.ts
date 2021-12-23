import { createFeatureSelector, createSelector } from '@ngrx/store';

import { State } from './state';
import { AUTH_FEATURE_NAME } from './feature-name';

const authState = createFeatureSelector<State>(AUTH_FEATURE_NAME);

export const userInfo = createSelector(authState, (state) => state.auth);

export const firstName = createSelector(userInfo, (u) => u?.firstName);

export const lastName = createSelector(userInfo, (u) => u?.lastName);

export const username = createSelector(userInfo, (u) => u?.username);

export const roles = createSelector(userInfo, (u) => {
    if(u === null || u === undefined) {
        return [];
    }

    if(Array.isArray(u.roles)) {
        return u.roles;
    }

    return [u.roles];
});

export const isAdmin = createSelector(
    roles,
    (userRoles) => !!userRoles.find((r) => r === 'admin')
);
