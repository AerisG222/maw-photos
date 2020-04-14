import { NgModule } from '@angular/core';

import { PhotosRoutingModule } from './photos-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PhotoStoreModule } from './store';

import { BulkEditFilterComponent } from './components/bulk-edit-filter/bulk-edit-filter.component';
import { BulkEditGpsEditorComponent } from './components/bulk-edit-gps-editor/bulk-edit-gps-editor.component';
import { BulkEditSidebarComponent } from './components/bulk-edit-sidebar/bulk-edit-sidebar.component';
import { EffectsComponent } from './components/effects/effects.component';
import { ExifComponent } from './components/exif/exif.component';
import { ExifTableComponent } from './components/exif-table/exif-table.component';
import { FlipHorizontalButtonComponent } from './components/flip-horizontal-button/flip-horizontal-button.component';
import { FlipVerticalButtonComponent } from './components/flip-vertical-button/flip-vertical-button.component';
import { HistogramComponent } from './components/histogram/histogram.component';
import { PhotoCategoryComponent } from './components/photo-category/photo-category.component';
import { PhotoListBulkEditToolbarComponent } from './components/photo-list-bulk-edit-toolbar/photo-list-bulk-edit-toolbar.component';
import { PhotoListComponent } from './components/photo-list/photo-list.component';
import { PhotoListFullscreenToolbarComponent } from './components/photo-list-fullscreen-toolbar/photo-list-fullscreen-toolbar.component';
import { PhotoListMapToolbarComponent } from './components/photo-list-map-toolbar/photo-list-map-toolbar.component';
import { PhotoListToolbarComponent } from './components/photo-list-toolbar/photo-list-toolbar.component';
import { PhotoViewBulkEditComponent } from './components/photo-view-bulk-edit/photo-view-bulk-edit.component';
import { PhotoViewComponent } from './components/photo-view/photo-view.component';
import { PhotoSelectGridComponent } from './components/photo-select-grid/photo-select-grid.component';
import { PhotoSidebarComponent } from './components/photo-sidebar/photo-sidebar.component';
import { PhotoViewFullscreenComponent } from './components/photo-view-fullscreen/photo-view-fullscreen.component';
import { PhotoViewMapComponent } from './components/photo-view-map/photo-view-map.component';
import { RandomComponent } from './components/random/random.component';
import { RotateClockwiseButtonComponent } from './components/rotate-clockwise-button/rotate-clockwise-button.component';
import { RotateCounterClockwiseButtonComponent } from './components/rotate-counter-clockwise-button/rotate-counter-clockwise-button.component';
import { SlideshowButtonComponent } from './components/slideshow-button/slideshow-button.component';
import { SidebarCommentsComponent } from './components/sidebar-comments/sidebar-comments.component';


@NgModule({
    declarations: [
        BulkEditFilterComponent,
        BulkEditGpsEditorComponent,
        BulkEditSidebarComponent,
        EffectsComponent,
        ExifComponent,
        ExifTableComponent,
        FlipHorizontalButtonComponent,
        FlipVerticalButtonComponent,
        HistogramComponent,
        PhotoCategoryComponent,
        PhotoListBulkEditToolbarComponent,
        PhotoListComponent,
        PhotoListFullscreenToolbarComponent,
        PhotoListMapToolbarComponent,
        PhotoListToolbarComponent,
        PhotoSelectGridComponent,
        PhotoSidebarComponent,
        PhotoViewBulkEditComponent,
        PhotoViewComponent,
        PhotoViewFullscreenComponent,
        PhotoViewMapComponent,
        RandomComponent,
        RotateCounterClockwiseButtonComponent,
        RotateClockwiseButtonComponent,
        SlideshowButtonComponent,
        SidebarCommentsComponent
    ],
    imports: [
        SharedModule,
        PhotosRoutingModule,
        PhotoStoreModule
    ]
})
export class PhotosModule { }
