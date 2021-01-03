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
import { GridViewComponent } from './components/grid-view/grid-view.component';
import { GridViewToolbarComponent } from './components/grid-view-toolbar/grid-view-toolbar.component';
import { PhotosSharedModule } from '../photos-shared/photos-shared.module';
import { PhotoStoreFacadeService } from './services/photo-store-facade.service';
import { Navigable } from '../models/store-facades/navigable';
import { Commentable } from '../models/store-facades/commentable';
import { Ratable } from '../models/store-facades/ratable';
import { MetadataEditable } from '../models/store-facades/metadata-editable';
import { MiniMapable } from '../models/store-facades/mini-mapable';
import { CategoryTeaserSelectable } from '../models/store-facades/category-teaser-selectable';
import { PhotoLinkable } from '../models/store-facades/photo-linkable';
import { GridPhotoComponent } from './components/grid-photo/grid-photo.component';

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
        GridViewComponent,
        GridViewToolbarComponent,
        GridPhotoComponent
    ],
    imports: [
        PhotosRoutingModule,
        PhotosSharedModule,
        PhotoStoreModule
    ],
    providers: [
        PhotoStoreFacadeService,
        { provide: Navigable,                useExisting: PhotoStoreFacadeService },
        { provide: Commentable,              useExisting: PhotoStoreFacadeService },
        { provide: Ratable,                  useExisting: PhotoStoreFacadeService },
        { provide: MetadataEditable,         useExisting: PhotoStoreFacadeService },
        { provide: MiniMapable,              useExisting: PhotoStoreFacadeService },
        { provide: CategoryTeaserSelectable, useExisting: PhotoStoreFacadeService },
        { provide: PhotoLinkable,            useExisting: PhotoStoreFacadeService }
    ]
})
export class PhotosModule { }
