import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { startWith, map, withLatestFrom } from 'rxjs/operators';

import { SettingsService } from 'src/app/core/services/settings.service';
import * as SettingsActions from './actions';
import * as settingsSelectors from './selectors';
import { State } from './state';

@Injectable()
export class SettingsStoreEffects {
    constructor(
        private settingsService: SettingsService,
        private actions$: Actions,
        private store$: Store<State>
    ) {

    }

    loadRequestEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SettingsActions.loadRequest),
            startWith(SettingsActions.loadRequest()),
            map(x => {
                const settings = this.settingsService.load();
                return SettingsActions.loadSuccess({ settings });
            })
        )
    );

    saveRequestEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SettingsActions.saveRequest),
            map(action => {
                try {
                    this.settingsService.save(action.settings);
                    return SettingsActions.saveSuccess(action);
                } catch (err) {
                    return SettingsActions.saveFailure(err);
                }
            })
        )
    );

    propertyChangeTriggersSaveEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                SettingsActions.toggleCategoryListCategoryTitlesRequest,
                SettingsActions.updateCategoryListYearFilterRequest,
                SettingsActions.updateCategoryListCategoryFilterRequest,
                SettingsActions.updateCategoryListCategoryMarginRequest,
                SettingsActions.updateCategoryListListTypeRequest,
                SettingsActions.updateCategoryListListViewThumbnailSizeRequest,
                SettingsActions.updateCategoryListThumbnailSizeRequest,

                SettingsActions.togglePhotoInfoPanelCommentsRequest,
                SettingsActions.togglePhotoInfoPanelEffectsRequest,
                SettingsActions.togglePhotoInfoPanelExifRequest,
                SettingsActions.togglePhotoInfoPanelExpandedStateRequest,
                SettingsActions.togglePhotoInfoPanelHistogramRequest,
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

                SettingsActions.toggleVideoInfoPanelCommentsRequest,
                SettingsActions.toggleVideoInfoPanelExpandedStateRequest,
                SettingsActions.toggleVideoInfoPanelMinimapRequest,
                SettingsActions.toggleVideoInfoPanelRatingsRequest,
                SettingsActions.updateVideoInfoPanelMinimapMapTypeIdRequest,
                SettingsActions.updateVideoInfoPanelMinimapZoomRequest
            ),
            withLatestFrom(this.store$.pipe(
                select(settingsSelectors.selectSettings)
            )),
            map(x => {
                return SettingsActions.saveRequest({ settings: x[1] });
            })
        )
    );
}
