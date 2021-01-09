/* eslint-disable max-len */
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { VideosRoutingModule } from './videos-routing.module';
import { VideoStoreModule } from './store';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { VideoCategoryComponent } from './components/video-category/video-category.component';
import { VideoListComponent } from './components/video-list/video-list.component';
import {
    Navigable,
    Commentable,
    Ratable,
    MetadataEditable,
    MiniMapable,
    CategoryTeaserSelectable,
 } from '@core/facades';
import { VideoStoreFacadeService } from './services/video-store-facade.service';

@NgModule({
    declarations: [
        SidebarComponent,
        ToolbarComponent,
        VideoCategoryComponent,
        VideoListComponent
    ],
    imports: [
        SharedModule,
        VideosRoutingModule,
        VideoStoreModule
    ],
    providers: [
        VideoStoreFacadeService,
        { provide: Navigable,                useExisting: VideoStoreFacadeService },
        { provide: Commentable,              useExisting: VideoStoreFacadeService },
        { provide: Ratable,                  useExisting: VideoStoreFacadeService },
        { provide: MetadataEditable,         useExisting: VideoStoreFacadeService },
        { provide: MiniMapable,              useExisting: VideoStoreFacadeService },
        { provide: CategoryTeaserSelectable, useExisting: VideoStoreFacadeService }
    ]
})
export class VideosModule { }
