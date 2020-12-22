/* eslint-disable max-len */
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { VideosRoutingModule } from './videos-routing.module';
import { VideoStoreModule } from './store';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { VideoCategoryComponent } from './components/video-category/video-category.component';
import { VideoListComponent } from './components/video-list/video-list.component';
import { SidebarCommentsComponent } from './components/sidebar-comments/sidebar-comments.component';
import { SidebarMetadataEditorComponent } from './components/sidebar-metadata-editor/sidebar-metadata-editor.component';
import { SidebarMinimapComponent } from './components/sidebar-minimap/sidebar-minimap.component';
import { SidebarRatingComponent } from './components/sidebar-rating/sidebar-rating.component';
import { SidebarCategoryTeaserChooserComponent } from './components/sidebar-category-teaser-chooser/sidebar-category-teaser-chooser.component';

@NgModule({
    declarations: [
        SidebarComponent,
        ToolbarComponent,
        VideoCategoryComponent,
        VideoListComponent,
        SidebarCommentsComponent,
        SidebarMetadataEditorComponent,
        SidebarMinimapComponent,
        SidebarRatingComponent,
        SidebarCategoryTeaserChooserComponent
    ],
    imports: [
        SharedModule,
        VideosRoutingModule,
        VideoStoreModule
    ]
})
export class VideosModule { }
