import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CategoriesRoutingModule } from './categories-routing.module';

import { CategoryTypeFilterComponent } from './category-type-filter/category-type-filter.component';
import { CategoryYearFilterComponent } from './category-year-filter/category-year-filter.component';
import { PhotoCategoryComponent } from './photo-category/photo-category.component';
import { VideoCategoryComponent } from './video-category/video-category.component';
import { VideoInfoPanelComponent } from './video-info-panel/video-info-panel.component';
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
        VideoInfoPanelComponent,
        VideoListComponent,
        VideoListToolbarComponent,
        YearComponent,
        YearListComponent
    ],
    imports: [
        CommonModule,
        CategoriesRoutingModule,
        SharedModule
    ]
})
export class CategoriesModule { }
