import { DEFAULT_SETTINGS, Settings } from 'src/app/models/settings/settings';

export interface State {
    settings: Settings;
}

export const initialState: State = {
    settings: DEFAULT_SETTINGS
};
