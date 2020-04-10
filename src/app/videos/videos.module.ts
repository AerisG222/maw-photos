import { NgModule } from '@angular/core';

import { VideosRoutingModule } from './videos-routing.module';
import { VideoCategoryComponent } from './video-category/video-category.component';
import { VideoSidebarComponent } from './video-sidebar/video-sidebar.component';
import { VideoListComponent } from './video-list/video-list.component';
import { VideoListToolbarComponent } from './video-list-toolbar/video-list-toolbar.component';
import { SharedModule } from '../shared/shared.module';
import { VideoStoreModule } from './store';


@NgModule({
    declarations: [
        VideoCategoryComponent,
        VideoSidebarComponent,
        VideoListComponent,
        VideoListToolbarComponent
    ],
    imports: [
        SharedModule,
        VideosRoutingModule,
        VideoStoreModule
    ]
})
export class VideosModule { }
