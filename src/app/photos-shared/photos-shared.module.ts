/* eslint-disable max-len */
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { DefaultSidebarComponent } from './components/default-sidebar/default-sidebar.component';
import { DefaultToolbarComponent } from './components/default-toolbar/default-toolbar.component';
import { DefaultViewComponent } from './components/default-view/default-view.component';
import { FullscreenToolbarComponent } from './components/fullscreen-toolbar/fullscreen-toolbar.component';
import { FullscreenViewComponent } from './components/fullscreen-view/fullscreen-view.component';
import { PhotoListComponent } from '../photos-shared/components/photo-list/photo-list.component';
import { SidebarCategoryTeaserChooserComponent } from './components/sidebar-category-teaser-chooser/sidebar-category-teaser-chooser.component';
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

@NgModule({
    declarations: [
        DefaultSidebarComponent,
        DefaultToolbarComponent,
        DefaultViewComponent,
        FullscreenToolbarComponent,
        FullscreenViewComponent,
        PhotoListComponent,
        SidebarCategoryTeaserChooserComponent,
        SidebarEffectsComponent,
        SidebarExifComponent,
        SidebarExifTableComponent,
        SidebarHistogramComponent,
        ToolbarDownloadButtonComponent,
        ToolbarFlipHorizontalButtonComponent,
        ToolbarFlipVerticalButtonComponent,
        ToolbarRotateClockwiseButtonComponent,
        ToolbarRotateCounterClockwiseButtonComponent,
        ToolbarSlideshowButtonComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        SharedModule,

        DefaultViewComponent,
        DefaultSidebarComponent,
        FullscreenViewComponent,
        ToolbarSlideshowButtonComponent
    ]
})
export class PhotosSharedModule { }