import { Settings } from 'src/app/models/settings/settings';

export interface State {
    error: string | null;
    settings: Settings | null;
}

export const initialState: State = {
    error: null,
    settings: null
};
