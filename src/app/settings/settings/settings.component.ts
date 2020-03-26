import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';

import { Settings } from 'src/app/core/models/settings.model';
import { Theme } from 'src/app/core/models/theme.model';
import { ThumbnailSize } from 'src/app/core/models/thumbnail-size.model';
import { SettingsStoreActions, SettingsStoreSelectors } from 'src/app/core/root-store';
import { VideoSize } from 'src/app/core/models/video-size.model';
import { MinimapZoom } from 'src/app/core/models/minimap-zoom.model';
import { MapTypeId } from 'src/app/core/models/map-type-id.model';
import { CategoryMargin } from 'src/app/core/models/category-margin.model';
import { CategoryFilter } from 'src/app/core/models/category-filter.model';
import { CategoryListType } from 'src/app/core/models/category-list-type.model';
import { Subscription } from 'rxjs';


@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent implements OnInit, OnDestroy {
    private destroySub = new Subscription();

    form: FormGroup;
    themes = Theme.allThemes;
    categoryFilters = CategoryFilter.allCategoryFilters;
    categoryMargins = CategoryMargin.allCategoryMargins;
    categoryThumbnailSizes = ThumbnailSize.allSizes;
    categoryListListViewThumbnailSizes = ThumbnailSize.allSizes;
    categoryListTypes = CategoryListType.allTypes;
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

    // settings w/o ui
    private categoryListYearFilter: string | number;

    constructor(
        private formBuilder: FormBuilder,
        private store$: Store
    ) {

    }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            appTheme: ['', Validators.required],

            categoryListCategoryFilter: [CategoryFilter.all.name],
            categoryListCategoryMargin: [CategoryMargin.compact.name],
            categoryListShowCategoryTitles: [true],
            categoryListThumbnailSize: [''],
            categoryListListType: [CategoryListType.grid.name],
            categoryListListViewThumbnailSize: [''],

            photoListShowCategoryBreadcrumbs: [true],
            photoListThumbnailSize: [''],
            photoListShowPhotoList: [true],
            photoListSlideshowDisplayDurationSeconds: [2],
            photoListMapViewMapTypeId: [MapTypeId.ROADMAP.value],
            photoListMapViewZoom: [10],

            photoInfoPanelShowCategoryTeaserChooser: [false],
            photoInfoPanelShowComments: [true],
            photoInfoPanelShowEffects: [false],
            photoInfoPanelShowExif: [false],
            photoInfoPanelShowHistogram: [false],
            photoInfoPanelShowMetadataEditor: [false],
            photoInfoPanelShowMinimap: [false],
            photoInfoPanelShowRatings: [true],
            photoInfoPanelExpandedState: [false],
            photoInfoPanelMinimapMapTypeId: [MapTypeId.ROADMAP.value],
            photoInfoPanelMinimapZoom: [10],

            videoListShowCategoryBreadcrumbs: [true],
            videoListThumbnailSize: [''],
            videoListShowVideoList: [true],
            videoListVideoSize: [VideoSize.large.name],

            videoInfoPanelShowCategoryTeaserChooser: [false],
            videoInfoPanelShowComments: [true],
            videoInfoPanelShowMetadataEditor: [false],
            videoInfoPanelShowMinimap: [false],
            videoInfoPanelShowRatings: [true],
            videoInfoPanelExpandedState: [false],
            videoInfoPanelMinimapMapTypeId: [MapTypeId.ROADMAP.value],
            videoInfoPanelMinimapZoom: [10],

            searchCategoryMargin: [CategoryMargin.compact.name],
            searchShowCategoryTitles: [true],
            searchShowCategoryYears: [true],
            searchThumbnailSize: [''],
            searchListType: [CategoryListType.grid.name],
            searchListViewThumbnailSize: ['']
        });

        this.destroySub.add(this.store$
            .pipe(
                select(SettingsStoreSelectors.selectSettings),
                tap(s => this.updateForm(s)),
                tap(s => this.categoryListYearFilter = s.categoryListYearFilter)
            )
            .subscribe()
        );

        this.loadSettings();
    }

    ngOnDestroy(): void {
        this.destroySub.unsubscribe();
    }

    onSave(): void {
        const settings = {
            appTheme: Theme.forName(this.form.get('appTheme').value),

            categoryListCategoryFilter: CategoryFilter.forName(this.form.get('categoryListCategoryFilter').value),
            categoryListCategoryMargin: CategoryMargin.forName(this.form.get('categoryListCategoryMargin').value),
            categoryListShowCategoryTitles: this.form.get('categoryListShowCategoryTitles').value,
            categoryListThumbnailSize: ThumbnailSize.forName(this.form.get('categoryListThumbnailSize').value),
            categoryListYearFilter: this.categoryListYearFilter,
            categoryListListType: CategoryListType.forName(this.form.get('categoryListListType').value),
            categoryListListViewThumbnailSize: ThumbnailSize.forName(this.form.get('categoryListListViewThumbnailSize').value),

            photoListShowCategoryBreadcrumbs: this.form.get('photoListShowCategoryBreadcrumbs').value,
            photoListThumbnailSize: ThumbnailSize.forName(this.form.get('photoListThumbnailSize').value),
            photoListShowPhotoList: this.form.get('photoListShowPhotoList').value,
            photoListSlideshowDisplayDurationSeconds: this.form.get('photoListSlideshowDisplayDurationSeconds').value,
            photoListMapViewMapTypeId: this.form.get('photoListMapViewMapTypeId').value,
            photoListMapViewZoom: this.form.get('photoListMapViewZoom').value,

            photoInfoPanelShowCategoryTeaserChooser: this.form.get('photoInfoPanelShowCategoryTeaserChooser').value,
            photoInfoPanelShowComments: this.form.get('photoInfoPanelShowComments').value,
            photoInfoPanelShowEffects: this.form.get('photoInfoPanelShowEffects').value,
            photoInfoPanelShowExif: this.form.get('photoInfoPanelShowExif').value,
            photoInfoPanelShowHistogram: this.form.get('photoInfoPanelShowHistogram').value,
            photoInfoPanelShowMetadataEditor: this.form.get('photoInfoPanelShowMetadataEditor').value,
            photoInfoPanelShowMinimap: this.form.get('photoInfoPanelShowMinimap').value,
            photoInfoPanelShowRatings: this.form.get('photoInfoPanelShowRatings').value,
            photoInfoPanelExpandedState: this.form.get('photoInfoPanelExpandedState').value,
            photoInfoPanelMinimapMapTypeId: this.form.get('photoInfoPanelMinimapMapTypeId').value,
            photoInfoPanelMinimapZoom: this.form.get('photoInfoPanelMinimapZoom').value,

            videoListShowCategoryBreadcrumbs: this.form.get('videoListShowCategoryBreadcrumbs').value,
            videoListThumbnailSize: ThumbnailSize.forName(this.form.get('videoListThumbnailSize').value),
            videoListShowVideoList: this.form.get('videoListShowVideoList').value,
            videoListVideoSize: VideoSize.forName(this.form.get('videoListVideoSize').value),

            videoInfoPanelShowCategoryTeaserChooser: this.form.get('videoInfoPanelShowCategoryTeaserChooser').value,
            videoInfoPanelShowComments: this.form.get('videoInfoPanelShowComments').value,
            videoInfoPanelShowMetadataEditor: this.form.get('videoInfoPanelShowMetadataEditor').value,
            videoInfoPanelShowMinimap: this.form.get('videoInfoPanelShowMinimap').value,
            videoInfoPanelShowRatings: this.form.get('videoInfoPanelShowRatings').value,
            videoInfoPanelExpandedState: this.form.get('videoInfoPanelExpandedState').value,
            videoInfoPanelMinimapMapTypeId: this.form.get('videoInfoPanelMinimapMapTypeId').value,
            videoInfoPanelMinimapZoom: this.form.get('videoInfoPanelMinimapZoom').value,

            searchCategoryMargin: CategoryMargin.forName(this.form.get('searchCategoryMargin').value),
            searchShowCategoryTitles: this.form.get('searchShowCategoryTitles').value,
            searchShowCategoryYears: this.form.get('searchShowCategoryYears').value,
            searchThumbnailSize: ThumbnailSize.forName(this.form.get('searchThumbnailSize').value),
            searchListType: CategoryListType.forName(this.form.get('searchListType').value),
            searchListViewThumbnailSize: ThumbnailSize.forName(this.form.get('searchListViewThumbnailSize').value),
        };

        this.store$.dispatch(
            SettingsStoreActions.saveRequest({ settings })
        );
    }

    onCancel(): void {
        this.loadSettings();
    }

    private loadSettings(): void {
        this.store$.dispatch(
            SettingsStoreActions.loadRequest()
        );
    }

    private updateForm(settings: Settings): void {
        this.form.get('appTheme').setValue(settings.appTheme.name);

        this.form.get('categoryListCategoryFilter').setValue(settings.categoryListCategoryFilter.name);
        this.form.get('categoryListCategoryMargin').setValue(settings.categoryListCategoryMargin.name);
        this.form.get('categoryListShowCategoryTitles').setValue(settings.categoryListShowCategoryTitles);
        this.form.get('categoryListThumbnailSize').setValue(settings.categoryListThumbnailSize.name);
        this.form.get('categoryListListType').setValue(settings.categoryListListType.name);
        this.form.get('categoryListListViewThumbnailSize').setValue(settings.categoryListListViewThumbnailSize.name);

        this.form.get('photoListShowCategoryBreadcrumbs').setValue(settings.photoListShowCategoryBreadcrumbs);
        this.form.get('photoListThumbnailSize').setValue(settings.photoListThumbnailSize.name);
        this.form.get('photoListShowPhotoList').setValue(settings.photoListShowPhotoList);
        this.form.get('photoListSlideshowDisplayDurationSeconds').setValue(settings.photoListSlideshowDisplayDurationSeconds);
        this.form.get('photoListMapViewMapTypeId').setValue(settings.photoListMapViewMapTypeId);
        this.form.get('photoListMapViewZoom').setValue(settings.photoListMapViewZoom);

        this.form.get('photoInfoPanelShowCategoryTeaserChooser').setValue(settings.photoInfoPanelShowCategoryTeaserChooser);
        this.form.get('photoInfoPanelShowComments').setValue(settings.photoInfoPanelShowComments);
        this.form.get('photoInfoPanelShowEffects').setValue(settings.photoInfoPanelShowEffects);
        this.form.get('photoInfoPanelShowExif').setValue(settings.photoInfoPanelShowExif);
        this.form.get('photoInfoPanelShowHistogram').setValue(settings.photoInfoPanelShowHistogram);
        this.form.get('photoInfoPanelShowMetadataEditor').setValue(settings.photoInfoPanelShowMetadataEditor);
        this.form.get('photoInfoPanelShowMinimap').setValue(settings.photoInfoPanelShowMinimap);
        this.form.get('photoInfoPanelShowRatings').setValue(settings.photoInfoPanelShowRatings);
        this.form.get('photoInfoPanelExpandedState').setValue(settings.photoInfoPanelExpandedState);
        this.form.get('photoInfoPanelMinimapMapTypeId').setValue(settings.photoInfoPanelMinimapMapTypeId);
        this.form.get('photoInfoPanelMinimapZoom').setValue(settings.photoInfoPanelMinimapZoom);

        this.form.get('videoListShowCategoryBreadcrumbs').setValue(settings.videoListShowCategoryBreadcrumbs);
        this.form.get('videoListThumbnailSize').setValue(settings.videoListThumbnailSize.name);
        this.form.get('videoListShowVideoList').setValue(settings.videoListShowVideoList);
        this.form.get('videoListVideoSize').setValue(settings.videoListVideoSize.name);

        this.form.get('videoInfoPanelShowCategoryTeaserChooser').setValue(settings.videoInfoPanelShowCategoryTeaserChooser);
        this.form.get('videoInfoPanelShowComments').setValue(settings.videoInfoPanelShowComments);
        this.form.get('videoInfoPanelShowMetadataEditor').setValue(settings.videoInfoPanelShowMetadataEditor);
        this.form.get('videoInfoPanelShowMinimap').setValue(settings.videoInfoPanelShowMinimap);
        this.form.get('videoInfoPanelShowRatings').setValue(settings.videoInfoPanelShowRatings);
        this.form.get('videoInfoPanelExpandedState').setValue(settings.videoInfoPanelExpandedState);
        this.form.get('videoInfoPanelMinimapMapTypeId').setValue(settings.videoInfoPanelMinimapMapTypeId);
        this.form.get('videoInfoPanelMinimapZoom').setValue(settings.videoInfoPanelMinimapZoom);

        this.form.get('searchCategoryMargin').setValue(settings.searchCategoryMargin.name);
        this.form.get('searchShowCategoryTitles').setValue(settings.searchShowCategoryTitles);
        this.form.get('searchShowCategoryYears').setValue(settings.searchShowCategoryYears);
        this.form.get('searchThumbnailSize').setValue(settings.searchThumbnailSize.name);
        this.form.get('searchListType').setValue(settings.searchListType.name);
        this.form.get('searchListViewThumbnailSize').setValue(settings.searchListViewThumbnailSize.name);
    }
}
