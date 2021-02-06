import { createAction, props } from '@ngrx/store';

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

export const loadRequest = createAction(
    '[Settings] Load Request'
);

export const saveAppSettings = createAction(
    '[Settings] Save App Settings',
    props<{ settings: AppSettings }>()
);

export const saveCategoryFilterSettings = createAction(
    '[Settings] Save Category Filter Settings',
    props<{ settings: CategoryFilterSettings }>()
);

export const saveCategoryGridViewSettings = createAction(
    '[Settings] Save Category Grid View Settings',
    props<{ settings: CategoryGridViewSettings }>()
);

export const saveCategoryListViewSettings = createAction(
    '[Settings] Save Category List View Settings',
    props<{ settings: CategoryListViewSettings }>()
);

export const saveCategoryPageSettings = createAction(
    '[Settings] Save Page Settings',
    props<{ settings: CategoryPageSettings }>()
);

export const savePhotoDetailViewSettings = createAction(
    '[Settings] Save Photo Detail View Settings',
    props<{ settings: PhotoDetailViewSettings }>()
);

export const savePhotoGridViewSettings = createAction(
    '[Settings] Save Photo Grid View Settings',
    props<{ settings: PhotoGridViewSettings }>()
);

export const savePhotoInfoPanelSettings = createAction(
    '[Settings] Save Photo Info Panel Settings',
    props<{ settings: PhotoInfoPanelSettings }>()
);

export const savePhotoMapViewSettings = createAction(
    '[Settings] Save Photo Map View Settings',
    props<{ settings: PhotoMapViewSettings }>()
);

export const savePhotoPageSettings = createAction(
    '[Settings] Save Photo Page Settings',
    props<{ settings: PhotoPageSettings }>()
);

export const saveRandomDetailViewSettings = createAction(
    '[Settings] Save Random Detail View Settings',
    props<{ settings: PhotoDetailViewSettings }>()
);

export const saveRandomGridViewSettings = createAction(
    '[Settings] Save Random Grid View Settings',
    props<{ settings: PhotoGridViewSettings }>()
);

export const saveRandomInfoPanelSettings = createAction(
    '[Settings] Save Random Info Panel Settings',
    props<{ settings: PhotoInfoPanelSettings }>()
);

export const saveRandomPageSettings = createAction(
    '[Settings] Save Random Page Settings',
    props<{ settings: RandomPageSettings }>()
);

export const saveSearchGridViewSettings = createAction(
    '[Settings] Save Search Grid View Settings',
    props<{ settings: SearchGridViewSettings }>()
);

export const saveSearchListViewSettings = createAction(
    '[Settings] Save Search List View Settings',
    props<{ settings: SearchListViewSettings }>()
);

export const saveSearchPageSettings = createAction(
    '[Settings] Save Search Page Settings',
    props<{ settings: SearchPageSettings }>()
);

export const saveVideoDetailViewSettings = createAction(
    '[Settings] Save Video Detail View Settings',
    props<{ settings: VideoDetailViewSettings }>()
);

export const saveVideoPageSettings = createAction(
    '[Settings] Save Video Page Settings',
    props<{ settings: VideoPageSettings }>()
);
