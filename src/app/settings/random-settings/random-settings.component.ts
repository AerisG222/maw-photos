import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { allPhotoViewModes, allMapTypes, CategoryMargin, ThumbnailSize, MinimapZoom } from '@models';
import { DEFAULT_PHOTO_DETAIL_VIEW_SETTINGS } from 'src/app/models/settings/photo-detail-view-settings';
import { DEFAULT_PHOTO_GRID_VIEW_SETTINGS } from 'src/app/models/settings/photo-grid-view-settings';
import { DEFAULT_PHOTO_INFO_PANEL_SETTINGS } from 'src/app/models/settings/photo-info-panel-settings';
import { DEFAULT_PHOTO_SETTINGS } from 'src/app/models/settings/photo-page-settings';
import { DEFAULT_RANDOM_SETTINGS } from 'src/app/models/settings/random-page-settings';

@Component({
    selector: 'app-random-settings',
    templateUrl: './random-settings.component.html',
    styleUrls: ['./random-settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RandomSettingsComponent {
    form: FormGroup;
    viewModes = allPhotoViewModes;
    mapTypes = allMapTypes;
    margins = CategoryMargin.allCategoryMargins;
    thumbnailSizes = ThumbnailSize.allSizes;
    zoomLevels = MinimapZoom.allSizes;
    slideshowDurations = [1, 2, 3, 4, 5, 10, 15, 20, 25, 30, 45, 60];

    constructor(private fb: FormBuilder) {
        this.form = this.fb.group({
            page: this.fb.group({
                viewMode: DEFAULT_RANDOM_SETTINGS.viewMode,
                slideshowDuration: DEFAULT_PHOTO_SETTINGS.slideshowDisplayDurationSeconds
            }),
            detail: this.fb.group({
                showBreadcrumbs: DEFAULT_PHOTO_DETAIL_VIEW_SETTINGS.showBreadcrumbs,
                showPhotoList: DEFAULT_PHOTO_DETAIL_VIEW_SETTINGS.showPhotoList,
                thumbnailSize: DEFAULT_PHOTO_DETAIL_VIEW_SETTINGS.thumbnailSize,
                infoPanel: this.fb.group({
                    expandedState: DEFAULT_PHOTO_INFO_PANEL_SETTINGS.expandedState,
                    showRatings: DEFAULT_PHOTO_INFO_PANEL_SETTINGS.showRatings,
                    showComments: DEFAULT_PHOTO_INFO_PANEL_SETTINGS.showComments,
                    showExif: DEFAULT_PHOTO_INFO_PANEL_SETTINGS.showExif,
                    showHistogram: DEFAULT_PHOTO_INFO_PANEL_SETTINGS.showHistogram,
                    showEffects: DEFAULT_PHOTO_INFO_PANEL_SETTINGS.showEffects,
                    showMinimap: DEFAULT_PHOTO_INFO_PANEL_SETTINGS.showMinimap,
                    showMetadataEditor: DEFAULT_PHOTO_INFO_PANEL_SETTINGS.showMetadataEditor,
                    showCategoryTeaserChooser: DEFAULT_PHOTO_INFO_PANEL_SETTINGS.showCategoryTeaserChooser,
                    minimapType: DEFAULT_PHOTO_INFO_PANEL_SETTINGS.minimapMapType,
                })
            }),
            grid: this.fb.group({
                margin: DEFAULT_PHOTO_GRID_VIEW_SETTINGS.margin,
                showBreadcrumbs: DEFAULT_PHOTO_GRID_VIEW_SETTINGS.showBreadcrumbs,
                thumbnailSize: DEFAULT_PHOTO_GRID_VIEW_SETTINGS.thumbnailSize,
            })
        });
    }

    onSave() {

    }

    onCancel() {

    }
}
