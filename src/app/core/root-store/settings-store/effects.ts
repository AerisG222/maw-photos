import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { map, withLatestFrom } from 'rxjs/operators';

import { SettingsService } from 'src/app/core/services/settings.service';
import * as SettingsActions from './actions';
import * as settingsSelectors from './selectors';

@Injectable()
export class SettingsStoreEffects {
    constructor(
        private settingsService: SettingsService,
        private actions$: Actions,
        private store$: Store
    ) {

    }

    loadRequestEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(SettingsActions.loadRequest),
            map(action => {
                const settings = this.settingsService.load();
                return SettingsActions.loadSuccess({ settings });
            })
        );
    });

    saveRequestEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(SettingsActions.saveRequest),
            map(action => {
                try {
                    this.settingsService.save(action.settings);
                    return SettingsActions.saveSuccess(action);
                } catch (err) {
                    return SettingsActions.saveFailure(err);
                }
            })
        );
    });

    propertyChangeTriggersSaveEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(
                SettingsActions.updateMobileMarginsRequest,

                SettingsActions.toggleCategoryListCategoryTitlesRequest,
                SettingsActions.toggleCategoryListMissingGpsFilterRequest,
                SettingsActions.updateCategoryListYearFilterRequest,
                SettingsActions.updateCategoryListCategoryFilterRequest,
                SettingsActions.updateCategoryListCategoryMarginRequest,
                SettingsActions.updateCategoryListListTypeRequest,
                SettingsActions.updateCategoryListListViewThumbnailSizeRequest,
                SettingsActions.updateCategoryListThumbnailSizeRequest,

                SettingsActions.togglePhotoGridShowCategoryBreadcrumbsRequest,
                SettingsActions.updatePhotoGridMarginRequest,
                SettingsActions.updatePhotoGridThumbnailSizeRequest,

                SettingsActions.togglePhotoInfoPanelCategoryTeaserChooserRequest,
                SettingsActions.togglePhotoInfoPanelCommentsRequest,
                SettingsActions.togglePhotoInfoPanelEffectsRequest,
                SettingsActions.togglePhotoInfoPanelExifRequest,
                SettingsActions.togglePhotoInfoPanelExpandedStateRequest,
                SettingsActions.togglePhotoInfoPanelHistogramRequest,
                SettingsActions.togglePhotoInfoPanelMetadataEditorRequest,
                SettingsActions.togglePhotoInfoPanelMinimapRequest,
                SettingsActions.togglePhotoInfoPanelRatingsRequest,
                SettingsActions.updatePhotoInfoPanelMinimapMapTypeIdRequest,
                SettingsActions.updatePhotoInfoPanelMinimapZoomRequest,

                SettingsActions.togglePhotoListCategoryBreadcrumbsRequest,
                SettingsActions.togglePhotoListShowPhotoListRequest,
                SettingsActions.updatePhotoListMapViewMapTypeIdRequest,
                SettingsActions.updatePhotoListMapViewZoomRequest,
                SettingsActions.updatePhotoListThumbnailSizeRequest,

                SettingsActions.toggleVideoListCategoryBreadcrumbsRequest,
                SettingsActions.toggleVideoListShowVideoListRequest,
                SettingsActions.updateVideoListThumbnailSizeRequest,
                SettingsActions.updateVideoListVideoSizeRequest,

                SettingsActions.toggleVideoInfoPanelCategoryTeaserChooserRequest,
                SettingsActions.toggleVideoInfoPanelCommentsRequest,
                SettingsActions.toggleVideoInfoPanelExpandedStateRequest,
                SettingsActions.toggleVideoInfoPanelMetadataEditorRequest,
                SettingsActions.toggleVideoInfoPanelMinimapRequest,
                SettingsActions.toggleVideoInfoPanelRatingsRequest,
                SettingsActions.updateVideoInfoPanelMinimapMapTypeIdRequest,
                SettingsActions.updateVideoInfoPanelMinimapZoomRequest,

                SettingsActions.toggleSearchCategoryTitlesRequest,
                SettingsActions.toggleSearchCategoryYearsRequest,
                SettingsActions.updateSearchCategoryMarginRequest,
                SettingsActions.updateSearchListTypeRequest,
                SettingsActions.updateSearchListViewThumbnailSizeRequest,
                SettingsActions.updateSearchThumbnailSizeRequest,
            ),
            withLatestFrom(this.store$.pipe(
                select(settingsSelectors.selectSettings)
            )),
            map(x => {
                return SettingsActions.saveRequest({ settings: x[1] });
            })
        );
    });
}
