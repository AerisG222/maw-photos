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
import { Settings } from 'src/app/models/settings/settings';
import { VideoDetailViewSettings } from 'src/app/models/settings/video-detail-view-settings';
import { VideoInfoPanelSettings } from 'src/app/models/settings/video-info-panel-settings';
import { VideoPageSettings } from 'src/app/models/settings/video-page-settings';

export const loadRequest = createAction(
    '[Settings] Load Request'
);

export const loadSuccess = createAction(
    '[Settings] Load Success',
    props<{ settings: Settings }>()
);

export const saveAppSettings = createAction(
    '[Settings] Save App Settings',
    props<{ settings: AppSettings }>()
);

export const saveAppSettingsSuccess = createAction(
    '[Settings] Save App Settings Success',
    props<{ settings: AppSettings }>()
);

export const saveAppSettingsFailure = createAction(
    '[Settings] Save App Settings Failure',
    props<{ err: unknown }>()
);

export const saveCategoryFilterSettings = createAction(
    '[Settings] Save Category Filter Settings',
    props<{ settings: CategoryFilterSettings }>()
);

export const saveCategoryFilterSettingsSuccess = createAction(
    '[Settings] Save Category Filter Settings Success',
    props<{ settings: CategoryFilterSettings }>()
);

export const saveCategoryFilterSettingsFailure = createAction(
    '[Settings] Save Category Filter Settings Failure',
    props<{ err: unknown }>()
);

export const saveCategoryGridViewSettings = createAction(
    '[Settings] Save Category Grid View Settings',
    props<{ settings: CategoryGridViewSettings }>()
);

export const saveCategoryGridViewSettingsSuccess = createAction(
    '[Settings] Save Category Grid View Settings Success',
    props<{ settings: CategoryGridViewSettings }>()
);

export const saveCategoryGridViewSettingsFailure = createAction(
    '[Settings] Save Category Grid View Settings Failure',
    props<{ err: unknown }>()
);

export const saveCategoryListViewSettings = createAction(
    '[Settings] Save Category List View Settings',
    props<{ settings: CategoryListViewSettings }>()
);

export const saveCategoryListViewSettingsSuccess = createAction(
    '[Settings] Save Category List View Settings Success',
    props<{ settings: CategoryListViewSettings }>()
);

export const saveCategoryListViewSettingsFailure = createAction(
    '[Settings] Save Category List View Settings Failure',
    props<{ err: unknown }>()
);

export const saveCategoryPageSettings = createAction(
    '[Settings] Save Page Settings',
    props<{ settings: CategoryPageSettings }>()
);

export const saveCategoryPageSettingsSuccess = createAction(
    '[Settings] Save Page Settings Success',
    props<{ settings: CategoryPageSettings }>()
);

export const saveCategoryPageSettingsFailure = createAction(
    '[Settings] Save Page Settings Failure',
    props<{ err: unknown }>()
);

export const savePhotoDetailViewSettings = createAction(
    '[Settings] Save Photo Detail View Settings',
    props<{ settings: PhotoDetailViewSettings }>()
);

export const savePhotoDetailViewSettingsSuccess = createAction(
    '[Settings] Save Photo Detail View Settings Success',
    props<{ settings: PhotoDetailViewSettings }>()
);

export const savePhotoDetailViewSettingsFailure = createAction(
    '[Settings] Save Photo Detail View Settings Failure',
    props<{ err: unknown }>()
);

export const savePhotoGridViewSettings = createAction(
    '[Settings] Save Photo Grid View Settings',
    props<{ settings: PhotoGridViewSettings }>()
);

export const savePhotoGridViewSettingsSuccess = createAction(
    '[Settings] Save Photo Grid View Settings Success',
    props<{ settings: PhotoGridViewSettings }>()
);

export const savePhotoGridViewSettingsFailure = createAction(
    '[Settings] Save Photo Grid View Settings Failure',
    props<{ err: unknown }>()
);

export const savePhotoInfoPanelSettings = createAction(
    '[Settings] Save Photo Info Panel Settings',
    props<{ settings: PhotoInfoPanelSettings }>()
);

export const savePhotoInfoPanelSettingsSuccess = createAction(
    '[Settings] Save Photo Info Panel Settings Success',
    props<{ settings: PhotoInfoPanelSettings }>()
);

export const savePhotoInfoPanelSettingsFailure = createAction(
    '[Settings] Save Photo Info Panel Settings Failure',
    props<{ err: unknown }>()
);

export const savePhotoMapViewSettings = createAction(
    '[Settings] Save Photo Map View Settings',
    props<{ settings: PhotoMapViewSettings }>()
);

export const savePhotoMapViewSettingsSuccess = createAction(
    '[Settings] Save Photo Map View Settings Success',
    props<{ settings: PhotoMapViewSettings }>()
);

export const savePhotoMapViewSettingsFailure = createAction(
    '[Settings] Save Photo Map View Settings Failure',
    props<{ err: unknown }>()
);

export const savePhotoPageSettings = createAction(
    '[Settings] Save Photo Page Settings',
    props<{ settings: PhotoPageSettings }>()
);

export const savePhotoPageSettingsSuccess = createAction(
    '[Settings] Save Photo Page Settings Success',
    props<{ settings: PhotoPageSettings }>()
);

export const savePhotoPageSettingsFailure = createAction(
    '[Settings] Save Photo Page Settings Failure',
    props<{ err: unknown }>()
);

export const saveRandomDetailViewSettings = createAction(
    '[Settings] Save Random Detail View Settings',
    props<{ settings: PhotoDetailViewSettings }>()
);

export const saveRandomDetailViewSettingsSuccess = createAction(
    '[Settings] Save Random Detail View Settings Success',
    props<{ settings: PhotoDetailViewSettings }>()
);

export const saveRandomDetailViewSettingsFailure = createAction(
    '[Settings] Save Random Detail View Settings Failure',
    props<{ err: unknown }>()
);

export const saveRandomGridViewSettings = createAction(
    '[Settings] Save Random Grid View Settings',
    props<{ settings: PhotoGridViewSettings }>()
);

export const saveRandomGridViewSettingsSuccess = createAction(
    '[Settings] Save Random Grid View Settings Success',
    props<{ settings: PhotoGridViewSettings }>()
);

export const saveRandomGridViewSettingsFailure = createAction(
    '[Settings] Save Random Grid View Settings Failure',
    props<{ err: unknown }>()
);

export const saveRandomInfoPanelSettings = createAction(
    '[Settings] Save Random Info Panel Settings',
    props<{ settings: PhotoInfoPanelSettings }>()
);

export const saveRandomInfoPanelSettingsSuccess = createAction(
    '[Settings] Save Random Info Panel Settings Success',
    props<{ settings: PhotoInfoPanelSettings }>()
);

export const saveRandomInfoPanelSettingsFailure = createAction(
    '[Settings] Save Random Info Panel Settings Failure',
    props<{ err: unknown }>()
);

export const saveRandomPageSettings = createAction(
    '[Settings] Save Random Page Settings',
    props<{ settings: RandomPageSettings }>()
);

export const saveRandomPageSettingsSuccess = createAction(
    '[Settings] Save Random Page Settings Success',
    props<{ settings: RandomPageSettings }>()
);

export const saveRandomPageSettingsFailure = createAction(
    '[Settings] Save Random Page Settings Failure',
    props<{ err: unknown }>()
);

export const saveSearchGridViewSettings = createAction(
    '[Settings] Save Search Grid View Settings',
    props<{ settings: SearchGridViewSettings }>()
);

export const saveSearchGridViewSettingsSuccess = createAction(
    '[Settings] Save Search Grid View Settings Success',
    props<{ settings: SearchGridViewSettings }>()
);

export const saveSearchGridViewSettingsFailure = createAction(
    '[Settings] Save Search Grid View Settings Failure',
    props<{ err: unknown }>()
);

export const saveSearchListViewSettings = createAction(
    '[Settings] Save Search List View Settings',
    props<{ settings: SearchListViewSettings }>()
);

export const saveSearchListViewSettingsSuccess = createAction(
    '[Settings] Save Search List View Settings Success',
    props<{ settings: SearchListViewSettings }>()
);

export const saveSearchListViewSettingsFailure = createAction(
    '[Settings] Save Search List View Settings Failure',
    props<{ err: unknown }>()
);

export const saveSearchPageSettings = createAction(
    '[Settings] Save Search Page Settings',
    props<{ settings: SearchPageSettings }>()
);

export const saveSearchPageSettingsSuccess = createAction(
    '[Settings] Save Search Page Settings Success',
    props<{ settings: SearchPageSettings }>()
);

export const saveSearchPageSettingsFailure = createAction(
    '[Settings] Save Search Page Settings Failure',
    props<{ err: unknown }>()
);

export const saveVideoDetailViewSettings = createAction(
    '[Settings] Save Video Detail View Settings',
    props<{ settings: VideoDetailViewSettings }>()
);

export const saveVideoDetailViewSettingsSuccess = createAction(
    '[Settings] Save Video Detail View Settings Success',
    props<{ settings: VideoDetailViewSettings }>()
);

export const saveVideoDetailViewSettingsFailure = createAction(
    '[Settings] Save Video Detail View Settings Failure',
    props<{ err: unknown }>()
);

export const saveVideoInfoPanelSettings = createAction(
    '[Settings] Save Video Info Panel Settings',
    props<{ settings: VideoInfoPanelSettings }>()
);

export const saveVideoInfoPanelSettingsSuccess = createAction(
    '[Settings] Save Video Info Panel Settings Success',
    props<{ settings: VideoInfoPanelSettings }>()
);

export const saveVideoInfoPanelSettingsFailure = createAction(
    '[Settings] Save Video Info Panel Settings Failure',
    props<{ err: unknown }>()
);

export const saveVideoPageSettings = createAction(
    '[Settings] Save Video Page Settings',
    props<{ settings: VideoPageSettings }>()
);

export const saveVideoPageSettingsSuccess = createAction(
    '[Settings] Save Video Page Settings Success',
    props<{ settings: VideoPageSettings }>()
);

export const saveVideoPageSettingsFailure = createAction(
    '[Settings] Save Video Page Settings Failure',
    props<{ err: unknown }>()
);
