import { createAction, props } from '@ngrx/store';

import { AppSettings } from '@models';
import { CategoryFilterSettings } from '@models';
import { CategoryGridViewSettings } from '@models';
import { CategoryListViewSettings } from '@models';
import { CategoryPageSettings } from '@models';
import { PhotoDetailViewSettings } from '@models';
import { PhotoGridViewSettings } from '@models';
import { PhotoInfoPanelSettings } from '@models';
import { PhotoMapViewSettings } from '@models';
import { PhotoPageSettings } from '@models';
import { RandomPageSettings } from '@models';
import { SearchGridViewSettings } from '@models';
import { SearchListViewSettings } from '@models';
import { SearchPageSettings } from '@models';
import { Settings } from '@models';
import { VideoDetailViewSettings } from '@models';
import { VideoInfoPanelSettings } from '@models';

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
