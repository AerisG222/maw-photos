import { AppSettings, DEFAULT_APP_SETTINGS } from './app-settings';
import { CategorySettings, DEFAULT_CATEGORY_SETTINGS } from './category-settings';
import { DEFAULT_PHOTO_SETTINGS, PhotoSettings } from './photo-settings';
import { DEFAULT_RANDOM_SETTINGS, RandomSettings } from './random-settings';
import { DEFAULT_VIDEO_SETTINGS, VideoSettings } from './video-settings';
import { DEFAULT_SEARCH_SETTINGS, SearchSettings } from './search-settings';

export interface Settings {
    app: AppSettings;
    category: CategorySettings;
    photo: PhotoSettings;
    random: RandomSettings;
    search: SearchSettings;
    video: VideoSettings;
}

export const DEFAULT_SETTINGS: Settings = {
    app: DEFAULT_APP_SETTINGS,
    category: DEFAULT_CATEGORY_SETTINGS,
    photo: DEFAULT_PHOTO_SETTINGS,
    random: DEFAULT_RANDOM_SETTINGS,
    search: DEFAULT_SEARCH_SETTINGS,
    video: DEFAULT_VIDEO_SETTINGS
};
