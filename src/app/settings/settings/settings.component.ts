import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';

import { Settings, DEFAULT_SETTINGS } from 'src/app/models/settings.model';
import { Theme } from 'src/app/models/theme.model';
import { ThumbnailSize } from 'src/app/models/thumbnail-size.model';
import { SettingsStoreActions, SettingsStoreSelectors } from 'src/app/core/root-store';
import { VideoSize } from 'src/app/models/video-size.model';
import { MinimapZoom } from 'src/app/models/minimap-zoom.model';
import { MapTypeId } from 'src/app/models/map-type-id.model';
import { CategoryMargin } from 'src/app/models/category-margin.model';
import { CategoryFilter } from 'src/app/models/category-filter.model';
import { CategoryListType } from 'src/app/models/category-list-type.model';
import { Subscription } from 'rxjs';


@Component({
    selector: 'app-settings-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent implements OnInit, OnDestroy {
    form: FormGroup;
    themes = Theme.allThemes;
    categoryFilters = CategoryFilter.allCategoryFilters;
    categoryMargins = CategoryMargin.allCategoryMargins;
    categoryThumbnailSizes = ThumbnailSize.allSizes;
    categoryListListViewThumbnailSizes = ThumbnailSize.allSizes;
    categoryListTypes = CategoryListType.allTypes;
    photoGridMargins = CategoryMargin.allCategoryMargins;
    photoGridThumbnailSizes = ThumbnailSize.allSizes;
    photoListThumbnailSizes = ThumbnailSize.allSizes;
    videoListThumbnailSizes = ThumbnailSize.allSizes;
    mapViewMapTypeIds = MapTypeId.allTypeIds;
    photoMinimapMapTypeIds = MapTypeId.allTypeIds;
    videoMinimapMapTypeIds = MapTypeId.allTypeIds;
    mapViewZoomLevels = MinimapZoom.allSizes;
    photoZoomLevels = MinimapZoom.allSizes;
    videoZoomLevels = MinimapZoom.allSizes;
    videoSizes = VideoSize.allSizes;
    randomDurations = [ 1, 2, 3, 4, 5, 10, 15, 20, 25, 30, 45, 60 ];

    private destroySub = new Subscription();

    // settings w/o ui
    private categoryListYearFilter: string | number = DEFAULT_SETTINGS.categoryListYearFilter;
    private categoryListMissingGpsFilter = DEFAULT_SETTINGS.categoryListMissingGpsFilter;

    constructor(
        private formBuilder: FormBuilder,
        private store: Store
    ) {
        this.form = this.formBuilder.group({
            appTheme:                                 [DEFAULT_SETTINGS.appTheme.name, Validators.required],

            categoryListCategoryFilter:               [DEFAULT_SETTINGS.categoryListCategoryFilter],
            categoryListCategoryMargin:               [DEFAULT_SETTINGS.categoryListCategoryMargin.name],
            categoryListShowCategoryTitles:           [DEFAULT_SETTINGS.categoryListShowCategoryTitles],
            categoryListThumbnailSize:                [DEFAULT_SETTINGS.categoryListThumbnailSize],
            categoryListListType:                     [DEFAULT_SETTINGS.categoryListListType.name],
            categoryListListViewThumbnailSize:        [DEFAULT_SETTINGS.categoryListListViewThumbnailSize.name],

            photoListShowCategoryBreadcrumbs:         [DEFAULT_SETTINGS.photoListShowCategoryBreadcrumbs],
            photoListThumbnailSize:                   [DEFAULT_SETTINGS.photoListThumbnailSize.name],
            photoListShowPhotoList:                   [DEFAULT_SETTINGS.photoListShowPhotoList],
            photoListSlideshowDisplayDurationSeconds: [DEFAULT_SETTINGS.photoListSlideshowDisplayDurationSeconds],
            photoListMapViewMapTypeId:                [DEFAULT_SETTINGS.photoListMapViewMapTypeId],
            photoListMapViewZoom:                     [DEFAULT_SETTINGS.photoListMapViewZoom],

            photoGridMargin:                          [DEFAULT_SETTINGS.photoGridMargin.name],
            photoGridShowCategoryBreadcrumbs:         [DEFAULT_SETTINGS.photoGridShowCategoryBreadcrumbs],
            photoGridThumbnailSize:                   [DEFAULT_SETTINGS.photoGridThumbnailSize.name],

            photoInfoPanelShowCategoryTeaserChooser:  [DEFAULT_SETTINGS.photoInfoPanelShowCategoryTeaserChooser],
            photoInfoPanelShowComments:               [DEFAULT_SETTINGS.photoInfoPanelShowComments],
            photoInfoPanelShowEffects:                [DEFAULT_SETTINGS.photoInfoPanelShowEffects],
            photoInfoPanelShowExif:                   [DEFAULT_SETTINGS.photoInfoPanelShowExif],
            photoInfoPanelShowHistogram:              [DEFAULT_SETTINGS.photoInfoPanelShowHistogram],
            photoInfoPanelShowMetadataEditor:         [DEFAULT_SETTINGS.photoInfoPanelShowMetadataEditor],
            photoInfoPanelShowMinimap:                [DEFAULT_SETTINGS.photoInfoPanelShowMinimap],
            photoInfoPanelShowRatings:                [DEFAULT_SETTINGS.photoInfoPanelShowRatings],
            photoInfoPanelExpandedState:              [DEFAULT_SETTINGS.photoInfoPanelExpandedState],
            photoInfoPanelMinimapMapTypeId:           [DEFAULT_SETTINGS.photoInfoPanelMinimapMapTypeId],
            photoInfoPanelMinimapZoom:                [DEFAULT_SETTINGS.photoInfoPanelMinimapZoom],

            videoListShowCategoryBreadcrumbs:         [DEFAULT_SETTINGS.videoListShowCategoryBreadcrumbs],
            videoListThumbnailSize:                   [DEFAULT_SETTINGS.videoListThumbnailSize.name],
            videoListShowVideoList:                   [DEFAULT_SETTINGS.videoListShowVideoList],
            videoListVideoSize:                       [DEFAULT_SETTINGS.videoListVideoSize.name],

            videoInfoPanelShowCategoryTeaserChooser:  [DEFAULT_SETTINGS.videoInfoPanelShowCategoryTeaserChooser],
            videoInfoPanelShowComments:               [DEFAULT_SETTINGS.videoInfoPanelShowComments],
            videoInfoPanelShowMetadataEditor:         [DEFAULT_SETTINGS.videoInfoPanelShowMetadataEditor],
            videoInfoPanelShowMinimap:                [DEFAULT_SETTINGS.videoInfoPanelShowMinimap],
            videoInfoPanelShowRatings:                [DEFAULT_SETTINGS.videoInfoPanelShowRatings],
            videoInfoPanelExpandedState:              [DEFAULT_SETTINGS.videoInfoPanelExpandedState],
            videoInfoPanelMinimapMapTypeId:           [DEFAULT_SETTINGS.videoInfoPanelMinimapMapTypeId],
            videoInfoPanelMinimapZoom:                [DEFAULT_SETTINGS.videoInfoPanelMinimapZoom],

            searchCategoryMargin:                     [DEFAULT_SETTINGS.searchCategoryMargin.name],
            searchShowCategoryTitles:                 [DEFAULT_SETTINGS.searchShowCategoryTitles],
            searchShowCategoryYears:                  [DEFAULT_SETTINGS.searchShowCategoryYears],
            searchThumbnailSize:                      [DEFAULT_SETTINGS.searchListViewThumbnailSize.name],
            searchListType:                           [DEFAULT_SETTINGS.searchListType.name],
            searchListViewThumbnailSize:              [DEFAULT_SETTINGS.searchListViewThumbnailSize.name]
        });
    }

    ngOnInit(): void {
        this.destroySub.add(this.store
            .select(SettingsStoreSelectors.selectSettings)
            .pipe(
                tap(s => this.updateForm(s)),
                tap(s => this.categoryListYearFilter = s.categoryListYearFilter),
                tap(s => this.categoryListMissingGpsFilter = s.categoryListMissingGpsFilter)
            )
            .subscribe()
        );
    }

    ngOnDestroy(): void {
        this.destroySub.unsubscribe();
    }

    /* eslint-disable max-len */
    onSave(): void {
        const settings = {
            appTheme: Theme.forName(this.getFormString('appTheme', DEFAULT_SETTINGS.appTheme.name)),

            categoryListCategoryFilter:        CategoryFilter.forName(this.getFormString('categoryListCategoryFilter',       DEFAULT_SETTINGS.categoryListCategoryFilter.name)),
            categoryListCategoryMargin:        CategoryMargin.forName(this.getFormString('categoryListCategoryMargin',       DEFAULT_SETTINGS.categoryListCategoryMargin.name)),
            categoryListMissingGpsFilter:      this.categoryListMissingGpsFilter,
            categoryListShowCategoryTitles:    this.getFormBoolean('categoryListShowCategoryTitles',                         DEFAULT_SETTINGS.categoryListShowCategoryTitles),
            categoryListThumbnailSize:         ThumbnailSize.forName(this.getFormString('categoryListThumbnailSize',         DEFAULT_SETTINGS.categoryListThumbnailSize.name)),
            categoryListYearFilter:            this.categoryListYearFilter,
            categoryListListType:              CategoryListType.forName(this.getFormString('categoryListListType',           DEFAULT_SETTINGS.categoryListListType.name)),
            categoryListListViewThumbnailSize: ThumbnailSize.forName(this.getFormString('categoryListListViewThumbnailSize', DEFAULT_SETTINGS.categoryListListViewThumbnailSize.name)),

            photoListShowCategoryBreadcrumbs:         this.getFormBoolean('photoListShowCategoryBreadcrumbs',            DEFAULT_SETTINGS.photoListShowCategoryBreadcrumbs),
            photoListThumbnailSize:                   ThumbnailSize.forName(this.getFormString('photoListThumbnailSize', DEFAULT_SETTINGS.photoListThumbnailSize.name)),
            photoListShowPhotoList:                   this.getFormBoolean('photoListShowPhotoList',                      DEFAULT_SETTINGS.photoListShowPhotoList),
            photoListSlideshowDisplayDurationSeconds: this.getFormNumber('photoListSlideshowDisplayDurationSeconds',     DEFAULT_SETTINGS.photoListSlideshowDisplayDurationSeconds),
            photoListMapViewMapTypeId:                this.getFormString('photoListMapViewMapTypeId',                    DEFAULT_SETTINGS.photoListMapViewMapTypeId),
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
            photoInfoPanelMinimapMapTypeId:          this.getFormString('photoInfoPanelMinimapMapTypeId',           DEFAULT_SETTINGS.photoInfoPanelMinimapMapTypeId),
            photoInfoPanelMinimapZoom:               this.getFormNumber('photoInfoPanelMinimapZoom',                DEFAULT_SETTINGS.photoInfoPanelMinimapZoom),

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
            videoInfoPanelMinimapMapTypeId:          this.getFormString('videoInfoPanelMinimapMapTypeId',           DEFAULT_SETTINGS.videoInfoPanelMinimapMapTypeId),
            videoInfoPanelMinimapZoom:               this.getFormNumber('videoInfoPanelMinimapZoom',                DEFAULT_SETTINGS.videoInfoPanelMinimapZoom),

            searchCategoryMargin:        CategoryMargin.forName(this.getFormString('searchCategoryMargin',       DEFAULT_SETTINGS.searchCategoryMargin.name)),
            searchShowCategoryTitles:    this.getFormBoolean('searchShowCategoryTitles',                         DEFAULT_SETTINGS.searchShowCategoryTitles),
            searchShowCategoryYears:     this.getFormBoolean('searchShowCategoryYears',                          DEFAULT_SETTINGS.searchShowCategoryYears),
            searchThumbnailSize:         ThumbnailSize.forName(this.getFormString('searchThumbnailSize',         DEFAULT_SETTINGS.searchThumbnailSize.name)),
            searchListType:              CategoryListType.forName(this.getFormString('searchListType',           DEFAULT_SETTINGS.searchListType.name)),
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

        this.form.get('categoryListCategoryFilter')?.setValue(settings.categoryListCategoryFilter.name);
        this.form.get('categoryListCategoryMargin')?.setValue(settings.categoryListCategoryMargin.name);
        this.form.get('categoryListShowCategoryTitles')?.setValue(settings.categoryListShowCategoryTitles);
        this.form.get('categoryListThumbnailSize')?.setValue(settings.categoryListThumbnailSize.name);
        this.form.get('categoryListListType')?.setValue(settings.categoryListListType.name);
        this.form.get('categoryListListViewThumbnailSize')?.setValue(settings.categoryListListViewThumbnailSize.name);

        this.form.get('photoListShowCategoryBreadcrumbs')?.setValue(settings.photoListShowCategoryBreadcrumbs);
        this.form.get('photoListThumbnailSize')?.setValue(settings.photoListThumbnailSize.name);
        this.form.get('photoListShowPhotoList')?.setValue(settings.photoListShowPhotoList);
        this.form.get('photoListSlideshowDisplayDurationSeconds')?.setValue(settings.photoListSlideshowDisplayDurationSeconds);
        this.form.get('photoListMapViewMapTypeId')?.setValue(settings.photoListMapViewMapTypeId);
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
        this.form.get('photoInfoPanelMinimapMapTypeId')?.setValue(settings.photoInfoPanelMinimapMapTypeId);
        this.form.get('photoInfoPanelMinimapZoom')?.setValue(settings.photoInfoPanelMinimapZoom);

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
        this.form.get('videoInfoPanelMinimapMapTypeId')?.setValue(settings.videoInfoPanelMinimapMapTypeId);
        this.form.get('videoInfoPanelMinimapZoom')?.setValue(settings.videoInfoPanelMinimapZoom);

        this.form.get('searchCategoryMargin')?.setValue(settings.searchCategoryMargin.name);
        this.form.get('searchShowCategoryTitles')?.setValue(settings.searchShowCategoryTitles);
        this.form.get('searchShowCategoryYears')?.setValue(settings.searchShowCategoryYears);
        this.form.get('searchThumbnailSize')?.setValue(settings.searchThumbnailSize.name);
        this.form.get('searchListType')?.setValue(settings.searchListType.name);
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
