import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { CategoriesRoutingModule } from './categories-routing.module';
import { PhotoCategoryComponent } from './photo-category/photo-category.component';
import { CategoryCardComponent } from './category-card/category-card.component';
import { CategoryGridComponent } from './category-grid/category-grid.component';
import { YearComponent } from './year/year.component';
import { YearListComponent } from './year-list/year-list.component';
import { VideoCategoryComponent } from './video-category/video-category.component';
import { VideoListToolbarComponent } from './video-list-toolbar/video-list-toolbar.component';
import { VideoListComponent } from './video-list/video-list.component';
import { CategoryList2Component } from './category-list2/category-list2.component';

@NgModule({
    declarations: [
        CategoryCardComponent,
        PhotoCategoryComponent,
        CategoryGridComponent,
        YearComponent,
        YearListComponent,
        VideoCategoryComponent,
        VideoListToolbarComponent,
        VideoListComponent,
        CategoryList2Component
    ],
    imports: [
        CommonModule,
        CategoriesRoutingModule,
        SharedModule
    ]
})
export class CategoriesModule { }
