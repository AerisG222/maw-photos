import { NgModule } from '@angular/core';

import { PhotosRoutingModule } from './photos-routing.module';
import { PhotoStoreModule } from '../core/root-store/photos-store';

import { BulkEditComponent } from './components/bulk-edit/bulk-edit.component';
import { BulkEditFilterComponent } from './components/bulk-edit-filter/bulk-edit-filter.component';
import { BulkEditGpsEditorComponent } from './components/bulk-edit-gps-editor/bulk-edit-gps-editor.component';
import { BulkEditSidebarComponent } from './components/bulk-edit-sidebar/bulk-edit-sidebar.component';
import { BulkEditToolbarComponent } from './components/bulk-edit-toolbar/bulk-edit-toolbar.component';
import { MapToolbarComponent } from './components/map-toolbar/map-toolbar.component';
import { MapViewComponent } from './components/map-view/map-view.component';
import { PhotoSelectGridComponent } from './components/photo-select-grid/photo-select-grid.component';
import { PhotosSharedModule } from '../photos-shared/photos-shared.module';
import { PhotoStoreFacadeService } from './services/photo-store-facade.service';
import {
    Navigable,
    Commentable,
    Ratable,
    MetadataEditable,
    MiniMapable,
    CategoryTeaserSelectable,
    PhotoLinkable,
    PhotoViewModeSelectable
} from '@models';
import { ViewModeGuard } from './services/view-mode.guard';
import { PhotosUrlService } from './services/photos-url.service';

@NgModule({
    declarations: [
        BulkEditComponent,
        BulkEditFilterComponent,
        BulkEditGpsEditorComponent,
        BulkEditSidebarComponent,
        BulkEditToolbarComponent,
        MapToolbarComponent,
        MapViewComponent,
        PhotoSelectGridComponent,
    ],
    imports: [PhotosRoutingModule, PhotosSharedModule, PhotoStoreModule],
    providers: [
        PhotoStoreFacadeService,
        { provide: Navigable, useExisting: PhotoStoreFacadeService },
        { provide: Commentable, useExisting: PhotoStoreFacadeService },
        { provide: Ratable, useExisting: PhotoStoreFacadeService },
        { provide: MetadataEditable, useExisting: PhotoStoreFacadeService },
        { provide: MiniMapable, useExisting: PhotoStoreFacadeService },
        {
            provide: CategoryTeaserSelectable,
            useExisting: PhotoStoreFacadeService,
        },
        { provide: PhotoLinkable, useExisting: PhotoStoreFacadeService },
        {
            provide: PhotoViewModeSelectable,
            useExisting: PhotoStoreFacadeService,
        },
        PhotosUrlService,
        ViewModeGuard,
    ],
})
export class PhotosModule {}
