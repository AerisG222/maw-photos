import { Theme } from '../theme';

export interface AppSettings {
    theme: Theme;
}

export const DEFAULT_APP_SETTINGS: AppSettings = {
    theme: Theme.dark,
};
