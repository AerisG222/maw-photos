import { Settings, DEFAULT_SETTINGS } from 'src/app/models/settings.model';

export interface State {
    error?: string;
    isLoading: boolean;
    settings: Settings;
}

export const initialState: State = {
    error: undefined,
    isLoading: false,
    settings: DEFAULT_SETTINGS
};
