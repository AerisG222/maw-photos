import { createAction, props } from '@ngrx/store';
import { UserSettings } from 'oidc-client';

export const updateUserPropertiesRequest = createAction(
    '[Auth] Update User Properties Request',
    props<{ userSettings: UserSettings }>()
);
