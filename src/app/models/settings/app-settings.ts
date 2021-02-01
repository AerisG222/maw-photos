import { Theme } from '../theme.model';

export interface AppSettings {
    theme: Theme;
}

export const DEFAULT_APP_SETTINGS: AppSettings = {
    theme: Theme.themeDark
};
