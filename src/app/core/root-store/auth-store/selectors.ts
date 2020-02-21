import {
    createFeatureSelector,
    createSelector
} from '@ngrx/store';

import { State } from './state';
import { AUTH_FEATURE_NAME } from './feature-name';
import { UserSettings } from 'oidc-client';

const getUserSettings = (state: State): UserSettings => state.auth;

export const selectAuthState = createFeatureSelector<State>(AUTH_FEATURE_NAME);

export const selectUserSettings = createSelector(selectAuthState, getUserSettings);

export const selectFirstName = createSelector(
    selectUserSettings,
    u => u?.profile?.given_name
);

export const selectLastName = createSelector(
    selectUserSettings,
    u => u?.profile.family_name
);

export const selectUsername = createSelector(
    selectUserSettings,
    u => u?.profile.name
);

export const selectRoles = createSelector(
    selectUserSettings,
    u => u?.profile.role
);

export const selectIsAdmin = createSelector(
    selectRoles,
    roles => !!(roles.find(r => r === 'admin'))
);
