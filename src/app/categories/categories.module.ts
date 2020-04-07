import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { CategoriesRoutingModule } from './categories-routing.module';

import { CategoryTypeFilterComponent } from './category-type-filter/category-type-filter.component';
import { CategoryYearFilterComponent } from './category-year-filter/category-year-filter.component';
import { PhotoCategoryComponent } from './photo-category/photo-category.component';
import { VideoCategoryComponent } from './video-category/video-category.component';
import { VideoSidebarComponent } from './video-sidebar/video-sidebar.component';
import { VideoListComponent } from './video-list/video-list.component';
import { VideoListToolbarComponent } from './video-list-toolbar/video-list-toolbar.component';
import { YearComponent } from './year/year.component';
import { YearListComponent } from './year-list/year-list.component';

@NgModule({
    declarations: [
        CategoryTypeFilterComponent,
        CategoryYearFilterComponent,
        PhotoCategoryComponent,
        VideoCategoryComponent,
        VideoSidebarComponent,
        VideoListComponent,
        VideoListToolbarComponent,
        YearComponent,
        YearListComponent
    ],
    imports: [
        CategoriesRoutingModule,
        SharedModule
    ]
})
export class CategoriesModule { }
