import { NgModule } from '@angular/core';

import { PhotosRoutingModule } from './photos-routing.module';
import { PhotoCategoryComponent } from './photo-category/photo-category.component';
import { RandomComponent } from './random/random.component';
import { SharedModule } from '../shared/shared.module';
import { PhotoStoreModule } from './store';

import { BulkEditSidebarComponent } from './bulk-edit-sidebar/bulk-edit-sidebar.component';
import { EffectsComponent } from './effects/effects.component';
import { ExifComponent } from './exif/exif.component';
import { ExifTableComponent } from './exif-table/exif-table.component';
import { FlipHorizontalButtonComponent } from './flip-horizontal-button/flip-horizontal-button.component';
import { FlipVerticalButtonComponent } from './flip-vertical-button/flip-vertical-button.component';
import { HistogramComponent } from './histogram/histogram.component';
import { PhotoSidebarComponent } from './photo-sidebar/photo-sidebar.component';
import { PhotoListBulkEditToolbarComponent } from './photo-list-bulk-edit-toolbar/photo-list-bulk-edit-toolbar.component';
import { PhotoListComponent } from './photo-list/photo-list.component';
import { PhotoListFullscreenToolbarComponent } from './photo-list-fullscreen-toolbar/photo-list-fullscreen-toolbar.component';
import { PhotoListMapToolbarComponent } from './photo-list-map-toolbar/photo-list-map-toolbar.component';
import { PhotoListToolbarComponent } from './photo-list-toolbar/photo-list-toolbar.component';
import { PhotoViewBulkEditComponent } from './photo-view-bulk-edit/photo-view-bulk-edit.component';
import { PhotoViewComponent } from './photo-view/photo-view.component';
import { PhotoViewFullscreenComponent } from './photo-view-fullscreen/photo-view-fullscreen.component';
import { PhotoSelectGridComponent } from './photo-select-grid/photo-select-grid.component';
import { PhotoViewMapComponent } from './photo-view-map/photo-view-map.component';
import { RotateCounterClockwiseButtonComponent } from './rotate-counter-clockwise-button/rotate-counter-clockwise-button.component';
import { RotateClockwiseButtonComponent } from './rotate-clockwise-button/rotate-clockwise-button.component';
import { SlideshowButtonComponent } from './slideshow-button/slideshow-button.component';
import { BulkEditFilterComponent } from './bulk-edit-filter/bulk-edit-filter.component';
import { BulkEditGpsEditorComponent } from './bulk-edit-gps-editor/bulk-edit-gps-editor.component';


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
        SlideshowButtonComponent
    ],
    imports: [
        SharedModule,
        PhotosRoutingModule,
        PhotoStoreModule
    ]
})
export class PhotosModule { }
