import { Observable } from 'rxjs';

import { AppSettings } from 'src/app/models/settings/app-settings';
import { CategoryFilterSettings } from 'src/app/models/settings/category-filter-settings';
import { CategoryGridViewSettings } from 'src/app/models/settings/category-grid-view-settings';
import { CategoryListViewSettings } from 'src/app/models/settings/category-list-view-settings';
import { CategoryPageSettings } from 'src/app/models/settings/category-page-settings';
import { PhotoDetailViewSettings } from 'src/app/models/settings/photo-detail-view-settings';
import { PhotoGridViewSettings } from 'src/app/models/settings/photo-grid-view-settings';
import { PhotoInfoPanelSettings } from 'src/app/models/settings/photo-info-panel-settings';
import { PhotoMapViewSettings } from 'src/app/models/settings/photo-map-view-settings';
import { PhotoPageSettings } from 'src/app/models/settings/photo-page-settings';
import { RandomPageSettings } from 'src/app/models/settings/random-page-settings';
import { SearchGridViewSettings } from 'src/app/models/settings/search-grid-view-settings';
import { SearchListViewSettings } from 'src/app/models/settings/search-list-view-settings';
import { SearchPageSettings } from 'src/app/models/settings/search-page-settings';
import { VideoDetailViewSettings } from 'src/app/models/settings/video-detail-view-settings';
import { VideoPageSettings } from 'src/app/models/settings/video-page-settings';

export abstract class BaseSettingsFacade<T> {
    abstract settings$: Observable<T>;

    abstract update(settings: T): void;
}

export abstract class AppSettingsFacade extends BaseSettingsFacade<AppSettings> { }

export abstract class CategoryFilterSettingsFacade extends BaseSettingsFacade<CategoryFilterSettings> { }
export abstract class CategoryGridSettingsFacade extends BaseSettingsFacade<CategoryGridViewSettings> { }
export abstract class CategoryListSettingsFacade extends BaseSettingsFacade<CategoryListViewSettings> { }
export abstract class CategoryPageSettingsFacade extends BaseSettingsFacade<CategoryPageSettings> { }

export abstract class PhotoDetailSettingsFacade extends BaseSettingsFacade<PhotoDetailViewSettings> { }
export abstract class PhotoGridSettingsFacade extends BaseSettingsFacade<PhotoGridViewSettings> { }
export abstract class PhotoInfoPanelSettingsFacade extends BaseSettingsFacade<PhotoInfoPanelSettings> { }
export abstract class PhotoMapSettingsFacade extends BaseSettingsFacade<PhotoMapViewSettings> { }
export abstract class PhotoPageSettingsFacade extends BaseSettingsFacade<PhotoPageSettings> { }

// TODO: hmm - share the above?  but might need these separated to support the settings page which will include both...
export abstract class RandomDetailSettingsFacade extends BaseSettingsFacade<PhotoDetailViewSettings> { }
export abstract class RandomGridSettingsFacade extends BaseSettingsFacade<PhotoGridViewSettings> { }
export abstract class RandomInfoPanelSettingsFacade extends BaseSettingsFacade<PhotoInfoPanelSettings> { }
export abstract class RandomPageSettingsFacade extends BaseSettingsFacade<RandomPageSettings> { }

export abstract class SearchGridSettingsFacade extends BaseSettingsFacade<SearchGridViewSettings> { }
export abstract class SearchListSettingsFacade extends BaseSettingsFacade<SearchListViewSettings> { }
export abstract class SearchPageSettingsFacade extends BaseSettingsFacade<SearchPageSettings> { }

export abstract class VideoDetailSettingsFacade extends BaseSettingsFacade<VideoDetailViewSettings> { }
export abstract class VideoPageSettingsFacade extends BaseSettingsFacade<VideoPageSettings> { }
