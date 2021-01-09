import { Settings, DEFAULT_SETTINGS } from '@models';

export interface State {
    error: string | null;
    isLoading: boolean;
    settings: Settings;
}

export const initialState: State = {
    error: null,
    isLoading: false,
    settings: DEFAULT_SETTINGS
};
