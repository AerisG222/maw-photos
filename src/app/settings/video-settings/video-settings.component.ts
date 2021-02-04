import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { allPhotoViewModes, allMapTypes, CategoryMargin, ThumbnailSize, MinimapZoom, VideoSize } from '@models';
import { DEFAULT_VIDEO_DETAIL_VIEW_SETTINGS } from 'src/app/models/settings/video-detail-view-settings';
import { DEFAULT_VIDEO_INFO_PANEL_SETTINGS } from 'src/app/models/settings/video-info-panel-settings';

@Component({
    selector: 'app-video-settings',
    templateUrl: './video-settings.component.html',
    styleUrls: ['./video-settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoSettingsComponent {
    form: FormGroup;
    viewModes = allPhotoViewModes;
    mapTypes = allMapTypes;
    margins = CategoryMargin.allCategoryMargins;
    thumbnailSizes = ThumbnailSize.allSizes;
    zoomLevels = MinimapZoom.allSizes;
    videoSizes = VideoSize.allSizes;

    constructor(private fb: FormBuilder) {
        this.form = this.fb.group({
            videoSize: DEFAULT_VIDEO_DETAIL_VIEW_SETTINGS.videoSize.name,
            showBreadcrumbs: DEFAULT_VIDEO_DETAIL_VIEW_SETTINGS.showBreadcrumbs,
            showVideoList: DEFAULT_VIDEO_DETAIL_VIEW_SETTINGS.showVideoList,
            thumbnailSize: DEFAULT_VIDEO_DETAIL_VIEW_SETTINGS.thumbnailSize,
            infoPanel: this.fb.group({
                expandedState: DEFAULT_VIDEO_INFO_PANEL_SETTINGS.expandedState,
                showRatings: DEFAULT_VIDEO_INFO_PANEL_SETTINGS.showRatings,
                showComments: DEFAULT_VIDEO_INFO_PANEL_SETTINGS.showComments,
                showMinimap: DEFAULT_VIDEO_INFO_PANEL_SETTINGS.showMinimap,
                showMetadataEditor: DEFAULT_VIDEO_INFO_PANEL_SETTINGS.showMetadataEditor,
                showCategoryTeaserChooser: DEFAULT_VIDEO_INFO_PANEL_SETTINGS.showCategoryTeaserChooser,
                minimapType: DEFAULT_VIDEO_INFO_PANEL_SETTINGS.minimapMapType,
                minimapZoom: DEFAULT_VIDEO_INFO_PANEL_SETTINGS.minimapZoom
            })
        });
    }

    onSave() {

    }

    onCancel() {

    }
}
