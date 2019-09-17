import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoryCardComponent } from './category-card/category-card.component';
import { CategoryGridComponent } from './category-grid/category-grid.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { PhotoCategoryComponent } from './photo-category/photo-category.component';
import { VideoCategoryComponent } from './video-category/video-category.component';
import { VideoListComponent } from './video-list/video-list.component';
import { VideoListToolbarComponent } from './video-list-toolbar/video-list-toolbar.component';
import { YearComponent } from './year/year.component';
import { YearListComponent } from './year-list/year-list.component';
import { CategoryYearFilterComponent } from './category-year-filter/category-year-filter.component';
import { CategoryTypeFilterComponent } from './category-type-filter/category-type-filter.component';

@NgModule({
    declarations: [
        CategoryCardComponent,
        CategoryGridComponent,
        CategoryListComponent,
        PhotoCategoryComponent,
        VideoCategoryComponent,
        VideoListComponent,
        VideoListToolbarComponent,
        YearComponent,
        YearListComponent,
        CategoryYearFilterComponent,
        CategoryTypeFilterComponent,
    ],
    imports: [
        CommonModule,
        CategoriesRoutingModule,
        SharedModule
    ]
})
export class CategoriesModule { }
