import { Settings, DEFAULT_SETTINGS } from 'src/app/core/models/settings.model';

export interface State {
    error: string;
    isLoading: boolean;
    settings: Settings;
}

export const initialState: State = {
    error: null,
    isLoading: false,
    settings: DEFAULT_SETTINGS
};
