import { Component, ChangeDetectionStrategy } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { first } from 'rxjs/operators';

import {
    allMapTypes,
    allPhotoViewModes,
    MapType,
    MinimapZoom,
    allMargins,
    toMarginDefaulted,
    toThumbnailSizeDefaulted,
    allThumbnailSizes,
    PhotoViewMode,
} from '@models';
import { PhotoDetailSettingsFacade } from '@core/facades/settings/photo-detail-settings-facade';
import { PhotoGridSettingsFacade } from '@core/facades/settings/random-grid-settings-facade';
import { PhotoInfoPanelSettingsFacade } from '@core/facades/settings/photo-info-panel-settings-facade';
import { PhotoMapSettingsFacade } from '@core/facades/settings/photo-map-settings-facade';
import { PhotoPageSettingsFacade } from '@core/facades/settings/photo-page-settings-facade';
import { PhotoDetailViewSettings } from '@models';
import { PhotoGridViewSettings } from '@models';
import { PhotoInfoPanelSettings } from '@models';
import { PhotoMapViewSettings } from '@models';
import { PhotoPageSettings } from '@models';

@Component({
    selector: 'app-photo-settings',
    templateUrl: './photo-settings.component.html',
    styleUrls: ['./photo-settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoSettingsComponent {
    form: UntypedFormGroup;
    viewModes = allPhotoViewModes;
    mapTypes = allMapTypes;
    margins = allMargins;
    thumbnailSizes = allThumbnailSizes;
    zoomLevels = MinimapZoom.allSizes;
    slideshowDurations = [1, 2, 3, 4, 5, 10, 15, 20, 25, 30, 45, 60];

    constructor(
        private fb: UntypedFormBuilder,
        private detailFacade: PhotoDetailSettingsFacade,
        private gridFacade: PhotoGridSettingsFacade,
        private infoFacade: PhotoInfoPanelSettingsFacade,
        private mapFacade: PhotoMapSettingsFacade,
        private pageFacade: PhotoPageSettingsFacade
    ) {
        this.form = this.fb.group({
            page: this.fb.group({
                viewMode: '',
                slideshowDuration: '',
            }),
            detail: this.fb.group({
                showBreadcrumbs: '',
                showPhotoList: '',
                thumbnailSize: '',
                infoPanel: this.fb.group({
                    expandedState: '',
                    showRatings: '',
                    showComments: '',
                    showExif: '',
                    showHistogram: '',
                    showEffects: '',
                    showMinimap: '',
                    showMetadataEditor: '',
                    showCategoryTeaserChooser: '',
                    minimapType: '',
                    minimapZoom: '',
                }),
            }),
            grid: this.fb.group({
                margin: '',
                showBreadcrumbs: '',
                thumbnailSize: '',
            }),
            map: this.fb.group({
                mapType: '',
                zoom: '',
            }),
        });

        this.resetForm();
    }

    onSave(): void {
        if (!this.form.valid) {
            return;
        }

        const detail = this.readDetailForm();
        const grid = this.readGridForm();
        const info = this.readInfoForm();
        const map = this.readMapForm();
        const page = this.readPageForm();

        this.detailFacade.save(detail);
        this.gridFacade.save(grid);
        this.infoFacade.save(info);
        this.mapFacade.save(map);
        this.pageFacade.save(page);
    }

    onCancel(): void {
        this.resetForm();
    }

    private readDetailForm(): PhotoDetailViewSettings {
        return {
            showBreadcrumbs: this.form.get('detail.showBreadcrumbs')
                ?.value as boolean,
            showPhotoList: this.form.get('detail.showPhotoList')
                ?.value as boolean,
            thumbnailSize: toThumbnailSizeDefaulted(
                this.form.get('detail.thumbnailSIze')?.value as string
            ),
        };
    }

    private readGridForm(): PhotoGridViewSettings {
        return {
            margin: toMarginDefaulted(this.form.get('grid.margin')?.value as string),
            showBreadcrumbs: this.form.get('grid.showBreadcrumbs')
                ?.value as boolean,
            thumbnailSize: toThumbnailSizeDefaulted(
                this.form.get('grid.thumbnailSize')?.value as string
            ),
        };
    }

    private readInfoForm(): PhotoInfoPanelSettings {
        return {
            expandedState: this.form.get('detail.infoPanel.expandedState')
                ?.value as boolean,
            showRatings: this.form.get('detail.infoPanel.showRatings')
                ?.value as boolean,
            showComments: this.form.get('detail.infoPanel.showComments')
                ?.value as boolean,
            showEffects: this.form.get('detail.infoPanel.showEffects')
                ?.value as boolean,
            showExif: this.form.get('detail.infoPanel.showExif')
                ?.value as boolean,
            showHistogram: this.form.get('detail.infoPanel.showHistogram')
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

    private readMapForm(): PhotoMapViewSettings {
        return {
            mapType: this.form.get('map.mapType')?.value as MapType,
            zoom: this.form.get('map.zoom')?.value as number,
        };
    }

    private readPageForm(): PhotoPageSettings {
        return {
            viewMode: this.form.get('page.viewMode')?.value as PhotoViewMode,
            slideshowDisplayDurationSeconds: this.form.get(
                'page.slideshowDuration'
            )?.value as number,
        };
    }

    private resetForm() {
        combineLatest([
            this.detailFacade.settings$,
            this.gridFacade.settings$,
            this.infoFacade.settings$,
            this.mapFacade.settings$,
            this.pageFacade.settings$,
        ])
            .pipe(first())
            .subscribe({
                next: ([detail, grid, info, map, page]) => {
                    this.form.patchValue({
                        page: {
                            viewMode: page.viewMode,
                            slideshowDuration:
                                page.slideshowDisplayDurationSeconds,
                        },
                        detail: {
                            showBreadcrumbs: detail.showBreadcrumbs,
                            showPhotoList: detail.showPhotoList,
                            thumbnailSize: detail.thumbnailSize,
                            infoPanel: {
                                expandedState: info.expandedState,
                                showRatings: info.showRatings,
                                showComments: info.showComments,
                                showExif: info.showExif,
                                showHistogram: info.showHistogram,
                                showEffects: info.showEffects,
                                showMinimap: info.showMinimap,
                                showMetadataEditor: info.showMetadataEditor,
                                showCategoryTeaserChooser:
                                    info.showCategoryTeaserChooser,
                                minimapType: info.minimapMapType,
                                minimapZoom: info.minimapZoom,
                            },
                        },
                        grid: {
                            margin: grid.margin,
                            showBreadcrumbs: grid.showBreadcrumbs,
                            thumbnailSize: grid.thumbnailSize,
                        },
                        map: {
                            mapType: map.mapType,
                            zoom: map.zoom,
                        },
                    });
                },
            });
    }
}
