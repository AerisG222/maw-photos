/* eslint-disable max-len */
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { VideosRoutingModule } from './videos-routing.module';
import { VideoStoreModule } from './store';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { VideoCategoryComponent } from './components/video-category/video-category.component';
import { VideoListComponent } from './components/video-list/video-list.component';
import { SidebarCategoryTeaserChooserComponent } from './components/sidebar-category-teaser-chooser/sidebar-category-teaser-chooser.component';
import { Navigable } from '../models/store-facades/navigable';
import { VideoStoreFacadeService } from './services/video-store-facade.service';
import { Commentable } from '../models/store-facades/commentable';
import { Ratable } from '../models/store-facades/ratable';
import { MetadataEditable } from '../models/store-facades/metadata-editable';
import { MiniMapable } from '../models/store-facades/mini-mapable';

@NgModule({
    declarations: [
        SidebarComponent,
        ToolbarComponent,
        VideoCategoryComponent,
        VideoListComponent,
        SidebarCategoryTeaserChooserComponent
    ],
    imports: [
        SharedModule,
        VideosRoutingModule,
        VideoStoreModule
    ],
    providers: [
        VideoStoreFacadeService,
        { provide: Navigable,        useExisting: VideoStoreFacadeService },
        { provide: Commentable,      useExisting: VideoStoreFacadeService },
        { provide: Ratable,          useExisting: VideoStoreFacadeService },
        { provide: MetadataEditable, useExisting: VideoStoreFacadeService },
        { provide: MiniMapable,      useExisting: VideoStoreFacadeService }
    ]
})
export class VideosModule { }
