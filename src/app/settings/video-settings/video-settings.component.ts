import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { first } from 'rxjs/operators';

import {
    allPhotoViewModes,
    allMapTypes,
    MinimapZoom,
    MapType,
    toThumbnailSizeDefaulted,
    allThumbnailSizes,
    allVideoSizes,
} from '@models';
import { VideoDetailSettingsFacade } from '@core/facades/settings/video-detail-settings-facade';
import { VideoInfoPanelSettingsFacade } from '@core/facades/settings/video-info-panel-settings-facade';
import { VideoDetailViewSettings } from '@models';
import { VideoInfoPanelSettings } from '@models';

@Component({
    selector: 'app-video-settings',
    templateUrl: './video-settings.component.html',
    styleUrls: ['./video-settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoSettingsComponent {
    form: FormGroup;
    viewModes = allPhotoViewModes;
    mapTypes = allMapTypes;
    thumbnailSizes = allThumbnailSizes;
    zoomLevels = MinimapZoom.allSizes;
    videoSizes = allVideoSizes;

    constructor(
        private fb: FormBuilder,
        private detailFacade: VideoDetailSettingsFacade,
        private infoFacade: VideoInfoPanelSettingsFacade
    ) {
        this.form = this.fb.group({
            detail: this.fb.group({
                videoSize: '',
                showBreadcrumbs: '',
                showVideoList: '',
                thumbnailSize: '',
                infoPanel: this.fb.group({
                    expandedState: '',
                    showRatings: '',
                    showComments: '',
                    showMinimap: '',
                    showMetadataEditor: '',
                    showCategoryTeaserChooser: '',
                    minimapType: '',
                    minimapZoom: '',
                }),
            }),
        });

        this.resetForm();
    }

    onSave() {
        const detail = this.readDetailForm();
        const info = this.readInfoForm();

        this.detailFacade.save(detail);
        this.infoFacade.save(info);
    }

    onCancel() {
        this.resetForm();
    }

    private readDetailForm(): VideoDetailViewSettings {
        return {
            videoSize: this.form.get('detail.videoSize')?.value,
            showBreadcrumbs: this.form.get('detail.showBreadcrumbs')
                ?.value as boolean,
            showVideoList: this.form.get('detail.showVideoList')
                ?.value as boolean,
            thumbnailSize: toThumbnailSizeDefaulted(
                this.form.get('detail.thumbnailSIze')?.value
            ),
        };
    }

    private readInfoForm(): VideoInfoPanelSettings {
        return {
            expandedState: this.form.get('detail.infoPanel.expandedState')
                ?.value as boolean,
            showRatings: this.form.get('detail.infoPanel.showRatings')
                ?.value as boolean,
            showComments: this.form.get('detail.infoPanel.showComments')
                ?.value as boolean,
            showMinimap: this.form.get('detail.infoPanel.showMinimap')
                ?.value as boolean,
            showMetadataEditor: this.form.get(
                'detail.infoPanel.showMetadataEditor'
            )?.value as boolean,
            showCategoryTeaserChooser: this.form.get(
                'detail.infoPanel.showCategoryTeaserChooser'
            )?.value as boolean,
            minimapMapType: this.form.get('detail.infoPanel.minimapType')
                ?.value as MapType,
            minimapZoom: this.form.get('detail.infoPanel.minimapZoom')
                ?.value as number,
        };
    }

    private resetForm() {
        combineLatest([this.detailFacade.settings$, this.infoFacade.settings$])
            .pipe(first())
            .subscribe({
                next: ([detail, info]) => {
                    this.form.patchValue({
                        detail: {
                            videoSize: detail.videoSize,
                            showBreadcrumbs: detail.showBreadcrumbs,
                            showVideoList: detail.showVideoList,
                            thumbnailSize: detail.thumbnailSize,
                            infoPanel: {
                                expandedState: info.expandedState,
                                showRatings: info.showRatings,
                                showComments: info.showComments,
                                showMinimap: info.showMinimap,
                                showMetadataEditor: info.showMetadataEditor,
                                showCategoryTeaserChooser:
                                    info.showCategoryTeaserChooser,
                                minimapType: info.minimapMapType,
                                minimapZoom: info.minimapZoom,
                            },
                        },
                    });
                },
            });
    }
}
