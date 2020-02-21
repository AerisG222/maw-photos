import { UserSettings } from 'oidc-client';

export interface State {
    auth: UserSettings;
}

export const initialState: State = {
    auth: null
};
