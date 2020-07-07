import { NgModule } from '@angular/core';

import { PhotosRoutingModule } from './photos-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PhotoStoreModule } from './store';

import { BulkEditComponent } from './components/bulk-edit/bulk-edit.component';
import { BulkEditFilterComponent } from './components/bulk-edit-filter/bulk-edit-filter.component';
import { BulkEditGpsEditorComponent } from './components/bulk-edit-gps-editor/bulk-edit-gps-editor.component';
import { BulkEditSidebarComponent } from './components/bulk-edit-sidebar/bulk-edit-sidebar.component';
import { BulkEditToolbarComponent } from './components/bulk-edit-toolbar/bulk-edit-toolbar.component';
import { DefaultSidebarComponent } from './components/default-sidebar/default-sidebar.component';
import { DefaultToolbarComponent } from './components/default-toolbar/default-toolbar.component';
import { DefaultViewComponent } from './components/default-view/default-view.component';
import { FullscreenToolbarComponent } from './components/fullscreen-toolbar/fullscreen-toolbar.component';
import { FullscreenViewComponent } from './components/fullscreen-view/fullscreen-view.component';
import { MapToolbarComponent } from './components/map-toolbar/map-toolbar.component';
import { MapViewComponent } from './components/map-view/map-view.component';
import { PhotoCategoryComponent } from './components/photo-category/photo-category.component';
import { PhotoListComponent } from './components/photo-list/photo-list.component';
import { PhotoSelectGridComponent } from './components/photo-select-grid/photo-select-grid.component';
import { RandomComponent } from './components/random/random.component';
import { SidebarCategoryTeaserChooserComponent } from './components/sidebar-category-teaser-chooser/sidebar-category-teaser-chooser.component';
import { SidebarCommentsComponent } from './components/sidebar-comments/sidebar-comments.component';
import { SidebarEffectsComponent } from './components/sidebar-effects/sidebar-effects.component';
import { SidebarExifComponent } from './components/sidebar-exif/sidebar-exif.component';
import { SidebarExifTableComponent } from './components/sidebar-exif-table/sidebar-exif-table.component';
import { SidebarHistogramComponent } from './components/sidebar-histogram/sidebar-histogram.component';
import { SidebarMetadataEditorComponent } from './components/sidebar-metadata-editor/sidebar-metadata-editor.component';
import { SidebarMinimapComponent } from './components/sidebar-minimap/sidebar-minimap.component';
import { SidebarRatingComponent } from './components/sidebar-rating/sidebar-rating.component';
import { ToolbarFlipHorizontalButtonComponent } from './components/toolbar-flip-horizontal-button/toolbar-flip-horizontal-button.component';
import { ToolbarFlipVerticalButtonComponent } from './components/toolbar-flip-vertical-button/toolbar-flip-vertical-button.component';
import { ToolbarRotateClockwiseButtonComponent } from './components/toolbar-rotate-clockwise-button/toolbar-rotate-clockwise-button.component';
import { ToolbarRotateCounterClockwiseButtonComponent } from './components/toolbar-rotate-counter-clockwise-button/toolbar-rotate-counter-clockwise-button.component';
import { ToolbarSlideshowButtonComponent } from './components/toolbar-slideshow-button/toolbar-slideshow-button.component';
import { GridViewComponent } from './components/grid-view/grid-view.component';
import { GridViewToolbarComponent } from './components/grid-view-toolbar/grid-view-toolbar.component';


@NgModule({
    declarations: [
        BulkEditComponent,
        BulkEditFilterComponent,
        BulkEditGpsEditorComponent,
        BulkEditSidebarComponent,
        BulkEditToolbarComponent,
        DefaultSidebarComponent,
        DefaultToolbarComponent,
        DefaultViewComponent,
        FullscreenToolbarComponent,
        FullscreenViewComponent,
        MapToolbarComponent,
        MapViewComponent,
        PhotoCategoryComponent,
        PhotoListComponent,
        PhotoSelectGridComponent,
        RandomComponent,
        SidebarCategoryTeaserChooserComponent,
        SidebarCommentsComponent,
        SidebarEffectsComponent,
        SidebarExifComponent,
        SidebarExifTableComponent,
        SidebarHistogramComponent,
        SidebarMetadataEditorComponent,
        SidebarMinimapComponent,
        SidebarRatingComponent,
        ToolbarFlipHorizontalButtonComponent,
        ToolbarFlipVerticalButtonComponent,
        ToolbarRotateClockwiseButtonComponent,
        ToolbarRotateCounterClockwiseButtonComponent,
        ToolbarSlideshowButtonComponent,
        GridViewComponent,
        GridViewToolbarComponent
    ],
    imports: [
        SharedModule,
        PhotosRoutingModule,
        PhotoStoreModule
    ]
})
export class PhotosModule { }
