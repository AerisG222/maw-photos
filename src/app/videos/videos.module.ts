import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { VideosRoutingModule } from './videos-routing.module';
import { VideoStoreModule } from './store';

import { VideoCategoryComponent } from './components/video-category/video-category.component';
import { VideoListComponent } from './components/video-list/video-list.component';
import { VideoListToolbarComponent } from './components/video-list-toolbar/video-list-toolbar.component';
import { VideoSidebarComponent } from './components/video-sidebar/video-sidebar.component';
import { SidebarCommentsComponent } from './components/sidebar-comments/sidebar-comments.component';
import { SidebarMetadataEditorComponent } from './components/sidebar-metadata-editor/sidebar-metadata-editor.component';
import { SidebarMinimapComponent } from './components/sidebar-minimap/sidebar-minimap.component';
import { SidebarRatingComponent } from './components/sidebar-rating/sidebar-rating.component';

@NgModule({
    declarations: [
        VideoCategoryComponent,
        VideoSidebarComponent,
        VideoListComponent,
        VideoListToolbarComponent,
        SidebarCommentsComponent,
        SidebarMetadataEditorComponent,
        SidebarMinimapComponent,
        SidebarRatingComponent
    ],
    imports: [
        SharedModule,
        VideosRoutingModule,
        VideoStoreModule
    ]
})
export class VideosModule { }
