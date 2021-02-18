/* eslint-disable max-len */
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { DetailSidebarComponent } from './components/detail-sidebar/detail-sidebar.component';
import { DetailToolbarComponent } from './components/detail-toolbar/detail-toolbar.component';
import { DetailViewComponent } from './components/detail-view/detail-view.component';
import { FullscreenToolbarComponent } from './components/fullscreen-toolbar/fullscreen-toolbar.component';
import { FullscreenViewComponent } from './components/fullscreen-view/fullscreen-view.component';
import { PhotoListComponent } from '../photos-shared/components/photo-list/photo-list.component';
import { SidebarEffectsComponent } from './components/sidebar-effects/sidebar-effects.component';
import { SidebarExifTableComponent } from './components/sidebar-exif-table/sidebar-exif-table.component';
import { SidebarExifComponent } from './components/sidebar-exif/sidebar-exif.component';
import { SidebarHistogramComponent } from './components/sidebar-histogram/sidebar-histogram.component';
import { ToolbarDownloadButtonComponent } from './components/toolbar-download-button/toolbar-download-button.component';
import { ToolbarFlipHorizontalButtonComponent } from './components/toolbar-flip-horizontal-button/toolbar-flip-horizontal-button.component';
import { ToolbarFlipVerticalButtonComponent } from './components/toolbar-flip-vertical-button/toolbar-flip-vertical-button.component';
import { ToolbarRotateClockwiseButtonComponent } from './components/toolbar-rotate-clockwise-button/toolbar-rotate-clockwise-button.component';
import { ToolbarRotateCounterClockwiseButtonComponent } from './components/toolbar-rotate-counter-clockwise-button/toolbar-rotate-counter-clockwise-button.component';
import { ToolbarSlideshowButtonComponent } from './components/toolbar-slideshow-button/toolbar-slideshow-button.component';
import { ToolbarGroupSelectViewComponent } from './components/toolbar-group-select-view/toolbar-group-select-view.component';
import { ToolbarViewGridButtonComponent } from './components/toolbar-view-grid-button/toolbar-view-grid-button.component';
import { ToolbarViewBulkEditButtonComponent } from './components/toolbar-view-bulk-edit-button/toolbar-view-bulk-edit-button.component';
import { ToolbarViewFullscreenButtonComponent } from './components/toolbar-view-fullscreen-button/toolbar-view-fullscreen-button.component';
import { ToolbarViewMapButtonComponent } from './components/toolbar-view-map-button/toolbar-view-map-button.component';
import { ToolbarViewDetailButtonComponent } from './components/toolbar-view-detail-button/toolbar-view-detail-button.component';
import { MainPhotoComponent } from './components/main-photo/main-photo.component';
import { GridViewComponent } from './components/grid-view/grid-view.component';
import { GridPhotoComponent } from './components/grid-photo/grid-photo.component';
import { GridViewToolbarComponent } from './components/grid-view-toolbar/grid-view-toolbar.component';

@NgModule({
    declarations: [
        DetailSidebarComponent,
        DetailToolbarComponent,
        DetailViewComponent,
        FullscreenToolbarComponent,
        FullscreenViewComponent,
        GridViewComponent,
        GridPhotoComponent,
        GridViewToolbarComponent,
        PhotoListComponent,
        SidebarEffectsComponent,
        SidebarExifComponent,
        SidebarExifTableComponent,
        SidebarHistogramComponent,
        ToolbarDownloadButtonComponent,
        ToolbarFlipHorizontalButtonComponent,
        ToolbarFlipVerticalButtonComponent,
        ToolbarRotateClockwiseButtonComponent,
        ToolbarRotateCounterClockwiseButtonComponent,
        ToolbarSlideshowButtonComponent,
        ToolbarGroupSelectViewComponent,
        ToolbarViewGridButtonComponent,
        ToolbarViewBulkEditButtonComponent,
        ToolbarViewFullscreenButtonComponent,
        ToolbarViewMapButtonComponent,
        ToolbarViewDetailButtonComponent,
        MainPhotoComponent,
    ],
    imports: [SharedModule],
    exports: [
        SharedModule,

        DetailViewComponent,
        DetailSidebarComponent,
        FullscreenViewComponent,
        GridViewComponent,
        GridPhotoComponent,
        ToolbarSlideshowButtonComponent,
        ToolbarGroupSelectViewComponent,
        ToolbarFlipHorizontalButtonComponent,
        ToolbarFlipVerticalButtonComponent,
        ToolbarRotateClockwiseButtonComponent,
        ToolbarRotateCounterClockwiseButtonComponent,
        MainPhotoComponent,
    ],
})
export class PhotosSharedModule {}
