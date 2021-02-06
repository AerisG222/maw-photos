import { DEFAULT_SETTINGS, Settings } from 'src/app/models/settings/settings';

export interface State {
    error: string | null;
    settings: Settings;
}

export const initialState: State = {
    error: null,
    settings: DEFAULT_SETTINGS
};
