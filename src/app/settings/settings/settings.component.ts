import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import {
    Settings,
    DEFAULT_SETTINGS,
    Theme,
    ThumbnailSize,
    VideoSize,
    CategoryMargin,
    toCategoryTypeFilter,
    toCategoryViewMode,
    toMapType,
    toPhotoViewMode,
} from '@models';
import { SettingsStoreActions } from '@core/root-store';

@Component({
    selector: 'app-settings-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent implements OnInit {
    constructor(
        private store: Store
    ) { }


    /* eslint-disable max-len */
    onSave(): void {
        const settings = {
            appTheme: Theme.forName(this.getFormString('appTheme', DEFAULT_SETTINGS.appTheme.name)),

            categoryListCategoryFilter:        toCategoryTypeFilter(this.getFormString('categoryListCategoryFilter', '')) ?? DEFAULT_SETTINGS.categoryListCategoryFilter,
            categoryListCategoryMargin:        CategoryMargin.forName(this.getFormString('categoryListCategoryMargin',       DEFAULT_SETTINGS.categoryListCategoryMargin.name)),
            categoryListMissingGpsFilter:      this.categoryListMissingGpsFilter,
            categoryListShowCategoryTitles:    this.getFormBoolean('categoryListShowCategoryTitles',                         DEFAULT_SETTINGS.categoryListShowCategoryTitles),
            categoryListThumbnailSize:         ThumbnailSize.forName(this.getFormString('categoryListThumbnailSize',         DEFAULT_SETTINGS.categoryListThumbnailSize.name)),
            categoryListYearFilter:            this.categoryListYearFilter,
            categoryListViewMode:              toCategoryViewMode(this.getFormString('categoryListViewMode', '')) ?? DEFAULT_SETTINGS.categoryListViewMode,
            categoryListListViewThumbnailSize: ThumbnailSize.forName(this.getFormString('categoryListListViewThumbnailSize', DEFAULT_SETTINGS.categoryListListViewThumbnailSize.name)),

            photoListShowCategoryBreadcrumbs:         this.getFormBoolean('photoListShowCategoryBreadcrumbs',            DEFAULT_SETTINGS.photoListShowCategoryBreadcrumbs),
            photoListThumbnailSize:                   ThumbnailSize.forName(this.getFormString('photoListThumbnailSize', DEFAULT_SETTINGS.photoListThumbnailSize.name)),
            photoListShowPhotoList:                   this.getFormBoolean('photoListShowPhotoList',                      DEFAULT_SETTINGS.photoListShowPhotoList),
            photoListSlideshowDisplayDurationSeconds: this.getFormNumber('photoListSlideshowDisplayDurationSeconds',     DEFAULT_SETTINGS.photoListSlideshowDisplayDurationSeconds),
            photoListMapViewMapType:                toMapType(this.getFormString('photoListMapViewMapType', '')) ??      DEFAULT_SETTINGS.photoListMapViewMapType,
            photoListMapViewZoom:                     this.getFormNumber('photoListMapViewZoom',                         DEFAULT_SETTINGS.photoListMapViewZoom),

            photoGridMargin:                  CategoryMargin.forName(this.getFormString('photoGridMargin',       DEFAULT_SETTINGS.photoGridMargin.name)),
            photoGridShowCategoryBreadcrumbs: this.getFormBoolean('photoGridShowCategoryBreadcrumbs',            DEFAULT_SETTINGS.photoGridShowCategoryBreadcrumbs),
            photoGridThumbnailSize:           ThumbnailSize.forName(this.getFormString('photoGridThumbnailSize', DEFAULT_SETTINGS.photoGridThumbnailSize.name)),

            photoInfoPanelShowCategoryTeaserChooser: this.getFormBoolean('photoInfoPanelShowCategoryTeaserChooser', DEFAULT_SETTINGS.photoInfoPanelShowCategoryTeaserChooser),
            photoInfoPanelShowComments:              this.getFormBoolean('photoInfoPanelShowComments',              DEFAULT_SETTINGS.photoInfoPanelShowComments),
            photoInfoPanelShowEffects:               this.getFormBoolean('photoInfoPanelShowEffects',               DEFAULT_SETTINGS.photoInfoPanelShowEffects),
            photoInfoPanelShowExif:                  this.getFormBoolean('photoInfoPanelShowExif',                  DEFAULT_SETTINGS.photoInfoPanelShowExif),
            photoInfoPanelShowHistogram:             this.getFormBoolean('photoInfoPanelShowHistogram',             DEFAULT_SETTINGS.photoInfoPanelShowHistogram),
            photoInfoPanelShowMetadataEditor:        this.getFormBoolean('photoInfoPanelShowMetadataEditor',        DEFAULT_SETTINGS.photoInfoPanelShowMetadataEditor),
            photoInfoPanelShowMinimap:               this.getFormBoolean('photoInfoPanelShowMinimap',               DEFAULT_SETTINGS.photoInfoPanelShowMinimap),
            photoInfoPanelShowRatings:               this.getFormBoolean('photoInfoPanelShowRatings',               DEFAULT_SETTINGS.photoInfoPanelShowRatings),
            photoInfoPanelExpandedState:             this.getFormBoolean('photoInfoPanelExpandedState',             DEFAULT_SETTINGS.photoInfoPanelExpandedState),
            photoInfoPanelMinimapMapType:          toMapType(this.getFormString('photoInfoPanelMinimapMapType', '')) ?? DEFAULT_SETTINGS.photoInfoPanelMinimapMapType,
            photoInfoPanelMinimapZoom:               this.getFormNumber('photoInfoPanelMinimapZoom',                DEFAULT_SETTINGS.photoInfoPanelMinimapZoom),

            photoViewMode: toPhotoViewMode(this.getFormString('photoViewMode', '')) ?? DEFAULT_SETTINGS.photoViewMode,

            videoListShowCategoryBreadcrumbs: this.getFormBoolean('videoListShowCategoryBreadcrumbs',            DEFAULT_SETTINGS.videoListShowCategoryBreadcrumbs),
            videoListThumbnailSize:           ThumbnailSize.forName(this.getFormString('videoListThumbnailSize', DEFAULT_SETTINGS.videoListThumbnailSize.name)),
            videoListShowVideoList:           this.getFormBoolean('videoListShowVideoList',                      DEFAULT_SETTINGS.videoListShowVideoList),
            videoListVideoSize:               VideoSize.forName(this.getFormString('videoListVideoSize',         DEFAULT_SETTINGS.videoListVideoSize.name)),

            videoInfoPanelShowCategoryTeaserChooser: this.getFormBoolean('videoInfoPanelShowCategoryTeaserChooser', DEFAULT_SETTINGS.videoInfoPanelShowCategoryTeaserChooser),
            videoInfoPanelShowComments:              this.getFormBoolean('videoInfoPanelShowComments',              DEFAULT_SETTINGS.videoInfoPanelShowComments),
            videoInfoPanelShowMetadataEditor:        this.getFormBoolean('videoInfoPanelShowMetadataEditor',        DEFAULT_SETTINGS.videoInfoPanelShowMetadataEditor),
            videoInfoPanelShowMinimap:               this.getFormBoolean('videoInfoPanelShowMinimap',               DEFAULT_SETTINGS.videoInfoPanelShowMinimap),
            videoInfoPanelShowRatings:               this.getFormBoolean('videoInfoPanelShowRatings',               DEFAULT_SETTINGS.videoInfoPanelShowRatings),
            videoInfoPanelExpandedState:             this.getFormBoolean('videoInfoPanelExpandedState',             DEFAULT_SETTINGS.videoInfoPanelExpandedState),
            videoInfoPanelMinimapMapType:          toMapType(this.getFormString('videoInfoPanelMinimapMapType', '')) ?? DEFAULT_SETTINGS.videoInfoPanelMinimapMapType,
            videoInfoPanelMinimapZoom:               this.getFormNumber('videoInfoPanelMinimapZoom',                DEFAULT_SETTINGS.videoInfoPanelMinimapZoom),

            searchCategoryMargin:        CategoryMargin.forName(this.getFormString('searchCategoryMargin',       DEFAULT_SETTINGS.searchCategoryMargin.name)),
            searchShowCategoryTitles:    this.getFormBoolean('searchShowCategoryTitles',                         DEFAULT_SETTINGS.searchShowCategoryTitles),
            searchShowCategoryYears:     this.getFormBoolean('searchShowCategoryYears',                          DEFAULT_SETTINGS.searchShowCategoryYears),
            searchThumbnailSize:         ThumbnailSize.forName(this.getFormString('searchThumbnailSize',         DEFAULT_SETTINGS.searchThumbnailSize.name)),
            searchViewMode:              toCategoryViewMode(this.getFormString('searchViewMode', '')) ?? DEFAULT_SETTINGS.searchViewMode,
            searchListViewThumbnailSize: ThumbnailSize.forName(this.getFormString('searchListViewThumbnailSize', DEFAULT_SETTINGS.searchListViewThumbnailSize.name)),
        };

        this.store.dispatch(
            SettingsStoreActions.saveRequest({ settings })
        );
    }
    /* eslint-enable max-len */

    onCancel(): void {
        this.loadSettings();
    }

    private loadSettings(): void {
        this.store.dispatch(
            SettingsStoreActions.loadRequest()
        );
    }

    private updateForm(settings: Settings): void {
        this.form.get('appTheme')?.setValue(settings.appTheme.name);

        this.form.get('categoryListCategoryFilter')?.setValue(settings.categoryListCategoryFilter);
        this.form.get('categoryListCategoryMargin')?.setValue(settings.categoryListCategoryMargin.name);
        this.form.get('categoryListShowCategoryTitles')?.setValue(settings.categoryListShowCategoryTitles);
        this.form.get('categoryListThumbnailSize')?.setValue(settings.categoryListThumbnailSize.name);
        this.form.get('categoryListViewMode')?.setValue(settings.categoryListViewMode);
        this.form.get('categoryListListViewThumbnailSize')?.setValue(settings.categoryListListViewThumbnailSize.name);

        this.form.get('photoListShowCategoryBreadcrumbs')?.setValue(settings.photoListShowCategoryBreadcrumbs);
        this.form.get('photoListThumbnailSize')?.setValue(settings.photoListThumbnailSize.name);
        this.form.get('photoListShowPhotoList')?.setValue(settings.photoListShowPhotoList);
        this.form.get('photoListSlideshowDisplayDurationSeconds')?.setValue(settings.photoListSlideshowDisplayDurationSeconds);
        this.form.get('photoListMapViewMapType')?.setValue(settings.photoListMapViewMapType);
        this.form.get('photoListMapViewZoom')?.setValue(settings.photoListMapViewZoom);

        this.form.get('photoGridMargin')?.setValue(settings.photoGridMargin.name);
        this.form.get('photoGridShowCategoryBreadcrumbs')?.setValue(settings.photoGridShowCategoryBreadcrumbs);
        this.form.get('photoGridThumbnailSize')?.setValue(settings.photoGridThumbnailSize.name);

        this.form.get('photoInfoPanelShowCategoryTeaserChooser')?.setValue(settings.photoInfoPanelShowCategoryTeaserChooser);
        this.form.get('photoInfoPanelShowComments')?.setValue(settings.photoInfoPanelShowComments);
        this.form.get('photoInfoPanelShowEffects')?.setValue(settings.photoInfoPanelShowEffects);
        this.form.get('photoInfoPanelShowExif')?.setValue(settings.photoInfoPanelShowExif);
        this.form.get('photoInfoPanelShowHistogram')?.setValue(settings.photoInfoPanelShowHistogram);
        this.form.get('photoInfoPanelShowMetadataEditor')?.setValue(settings.photoInfoPanelShowMetadataEditor);
        this.form.get('photoInfoPanelShowMinimap')?.setValue(settings.photoInfoPanelShowMinimap);
        this.form.get('photoInfoPanelShowRatings')?.setValue(settings.photoInfoPanelShowRatings);
        this.form.get('photoInfoPanelExpandedState')?.setValue(settings.photoInfoPanelExpandedState);
        this.form.get('photoInfoPanelMinimapMapType')?.setValue(settings.photoInfoPanelMinimapMapType);
        this.form.get('photoInfoPanelMinimapZoom')?.setValue(settings.photoInfoPanelMinimapZoom);

        this.form.get('photoViewMode')?.setValue(settings.photoViewMode);

        this.form.get('videoListShowCategoryBreadcrumbs')?.setValue(settings.videoListShowCategoryBreadcrumbs);
        this.form.get('videoListThumbnailSize')?.setValue(settings.videoListThumbnailSize.name);
        this.form.get('videoListShowVideoList')?.setValue(settings.videoListShowVideoList);
        this.form.get('videoListVideoSize')?.setValue(settings.videoListVideoSize.name);

        this.form.get('videoInfoPanelShowCategoryTeaserChooser')?.setValue(settings.videoInfoPanelShowCategoryTeaserChooser);
        this.form.get('videoInfoPanelShowComments')?.setValue(settings.videoInfoPanelShowComments);
        this.form.get('videoInfoPanelShowMetadataEditor')?.setValue(settings.videoInfoPanelShowMetadataEditor);
        this.form.get('videoInfoPanelShowMinimap')?.setValue(settings.videoInfoPanelShowMinimap);
        this.form.get('videoInfoPanelShowRatings')?.setValue(settings.videoInfoPanelShowRatings);
        this.form.get('videoInfoPanelExpandedState')?.setValue(settings.videoInfoPanelExpandedState);
        this.form.get('videoInfoPanelMinimapMapType')?.setValue(settings.videoInfoPanelMinimapMapType);
        this.form.get('videoInfoPanelMinimapZoom')?.setValue(settings.videoInfoPanelMinimapZoom);

        this.form.get('searchCategoryMargin')?.setValue(settings.searchCategoryMargin.name);
        this.form.get('searchShowCategoryTitles')?.setValue(settings.searchShowCategoryTitles);
        this.form.get('searchShowCategoryYears')?.setValue(settings.searchShowCategoryYears);
        this.form.get('searchThumbnailSize')?.setValue(settings.searchThumbnailSize.name);
        this.form.get('searchViewMode')?.setValue(settings.searchViewMode);
        this.form.get('searchListViewThumbnailSize')?.setValue(settings.searchListViewThumbnailSize.name);
    }

    private getFormString(name: string, def: string): string {
        const control = this.form.get(name);

        if (!!!control) {
            return def;
        }

        if (typeof(control.value) === 'string') {
            return control.value as string;
        }

        return def;
    }

    private getFormBoolean(name: string, def: boolean): boolean {
        const control = this.form.get(name);

        if (!!!control) {
            return def;
        }

        if (typeof(control.value) === 'boolean') {
            return control.value as boolean;
        }

        if (typeof(control.value) === 'string') {
            return Boolean(control.value);
        }

        return def;
    }

    private getFormNumber(name: string, def: number): number {
        const control = this.form.get(name);

        if (!!!control) {
            return def;
        }

        if (typeof(control.value) === 'number') {
            return control.value as number;
        }

        if (typeof(control.value) === 'string') {
            const num = Number(control.value);

            if (!isNaN(num)) {
                return num;
            }
        }

        return def;
    }
}
