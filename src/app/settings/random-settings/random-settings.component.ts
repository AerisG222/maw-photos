import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { first } from 'rxjs/operators';

import { RandomGridSettingsFacade } from '@core/facades/settings/photo-grid-settings-facade';
import { RandomDetailSettingsFacade } from '@core/facades/settings/random-detail-settings-facade';
import { RandomInfoPanelSettingsFacade } from '@core/facades/settings/random-info-panel-settings-facade';
import { RandomPageSettingsFacade } from '@core/facades/settings/random-page-settings-facade';
import { allPhotoViewModes, allMapTypes, CategoryMargin, ThumbnailSize, MinimapZoom, MapType } from '@models';
import { PhotoDetailViewSettings } from 'src/app/models/settings/photo-detail-view-settings';
import { PhotoGridViewSettings } from 'src/app/models/settings/photo-grid-view-settings';
import { PhotoInfoPanelSettings } from 'src/app/models/settings/photo-info-panel-settings';
import { RandomPageSettings } from 'src/app/models/settings/random-page-settings';

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

    constructor(
        private fb: FormBuilder,
        private detailFacade: RandomDetailSettingsFacade,
        private gridFacade: RandomGridSettingsFacade,
        private infoFacade: RandomInfoPanelSettingsFacade,
        private pageFacade: RandomPageSettingsFacade
    ) {
        this.form = this.fb.group({
            page: this.fb.group({
                viewMode: '',
                slideshowDuration: ''
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
                })
            }),
            grid: this.fb.group({
                margin: '',
                showBreadcrumbs: '',
                thumbnailSize: '',
            })
        });

        this.resetForm();
    }

    onSave() {
        if(!this.form.valid) {
            return;
        }

        const detail = this.readDetailForm();
        const grid = this.readGridForm();
        const info = this.readInfoForm();
        const page = this.readPageForm();

        this.detailFacade.save(detail);
        this.gridFacade.save(grid);
        this.infoFacade.save(info);
        this.pageFacade.save(page);
    }

    onCancel() {
        this.resetForm();
    }

    private readDetailForm(): PhotoDetailViewSettings {
        return {
            showBreadcrumbs: this.form.get('detail.showBreadcrumbs')?.value as boolean,
            showPhotoList: this.form.get('detail.showPhotoList')?.value as boolean,
            thumbnailSize: ThumbnailSize.forName(this.form.get('detail.thumbnailSIze')?.value)
        };
    }

    private readGridForm(): PhotoGridViewSettings {
        return {
            margin: CategoryMargin.forName(this.form.get('grid.margin')?.value),
            showBreadcrumbs: this.form.get('grid.showBreadcrumbs')?.value as boolean,
            thumbnailSize: ThumbnailSize.forName(this.form.get('grid.thumbnailSize')?.value)
        };
    }

    private readInfoForm(): PhotoInfoPanelSettings {
        return {
            expandedState: this.form.get('detail.infoPanel.expandedState')?.value as boolean,
            showRatings: this.form.get('detail.infoPanel.showRatings')?.value as boolean,
            showComments: this.form.get('detail.infoPanel.showComments')?.value as boolean,
            showEffects: this.form.get('detail.infoPanel.showEffects')?.value as boolean,
            showExif: this.form.get('detail.infoPanel.showExif')?.value as boolean,
            showHistogram: this.form.get('detail.infoPanel.showHistogram')?.value as boolean,
            showMinimap: this.form.get('detail.infoPanel.showMinimap')?.value as boolean,
            showMetadataEditor: this.form.get('detail.infoPanel.showMetadataEditor')?.value as boolean,
            showCategoryTeaserChooser: this.form.get('detail.infoPanel.showCategoryTeaserChoser')?.value as boolean,
            minimapMapType: this.form.get('detail.infoPanel.minimapType')?.value as MapType,
            minimapZoom: this.form.get('detail.infoPanel.minimapZoom')?.value as number
        };
    }

    private readPageForm(): RandomPageSettings {
        return {
            viewMode: this.form.get('page.viewMode')?.value,
            slideshowDisplayDurationSeconds: this.form.get('page.slideshowDisplayDurationSeconds')?.value as number
        };
    }

    private resetForm() {
        combineLatest([
            this.detailFacade.settings$,
            this.gridFacade.settings$,
            this.infoFacade.settings$,
            this.pageFacade.settings$
        ]).pipe(
            first()
        ).subscribe({
            next: ([detail, grid, info, page]) => {
                this.form.patchValue({
                    page: {
                        viewMode: page.viewMode,
                        slideshowDuration: page.slideshowDisplayDurationSeconds
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
                            showCategoryTeaserChooser: info.showCategoryTeaserChooser,
                            minimapType: info.minimapMapType,
                            minimapZoom: info.minimapZoom
                        }
                    },
                    grid: {
                        margin: grid.margin.name,
                        showBreadcrumbs: grid.showBreadcrumbs,
                        thumbnailSize: grid.thumbnailSize.name,
                    }
                });
            }
        });
    }
}
