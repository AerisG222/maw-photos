import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { concatMap, map, withLatestFrom } from 'rxjs/operators';

import { SettingsService } from '@core/services/settings.service';
import * as SettingsActions from './actions';
import * as settingsSelectors from './selectors';

@Injectable()
export class SettingsStoreEffects {
    loadRequestEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(SettingsActions.loadRequest),
            concatMap(action => {
                const settings = this.settingsService.load();
                return of(SettingsActions.loadSuccess({ settings }));
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
                SettingsActions.updatePhotoInfoPanelMinimapMapTypeRequest,
                SettingsActions.updatePhotoInfoPanelMinimapZoomRequest,

                SettingsActions.togglePhotoListCategoryBreadcrumbsRequest,
                SettingsActions.togglePhotoListShowPhotoListRequest,
                SettingsActions.updatePhotoListMapViewMapTypeRequest,
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
                SettingsActions.updateVideoInfoPanelMinimapMapTypeRequest,
                SettingsActions.updateVideoInfoPanelMinimapZoomRequest,

                SettingsActions.toggleSearchCategoryTitlesRequest,
                SettingsActions.toggleSearchCategoryYearsRequest,
                SettingsActions.updateSearchCategoryMarginRequest,
                SettingsActions.updateSearchListTypeRequest,
                SettingsActions.updateSearchListViewThumbnailSizeRequest,
                SettingsActions.updateSearchThumbnailSizeRequest,
            ),
            withLatestFrom(this.store.select(settingsSelectors.settings)),
            map(([action, settings]) => {
                return SettingsActions.saveRequest({ settings });
            })
        );
    });

    constructor(
        private settingsService: SettingsService,
        private actions$: Actions,
        private store: Store
    ) {

    }
}
