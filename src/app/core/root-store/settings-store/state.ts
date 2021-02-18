import { DEFAULT_SETTINGS, Settings } from '@models';

export interface State {
    settings: Settings;
}

export const initialState: State = {
    settings: DEFAULT_SETTINGS,
};
