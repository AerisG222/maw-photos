import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { CategoriesRoutingModule } from './categories-routing.module';
import { PhotoCategoryComponent } from './photo-category/photo-category.component';
import { CategoryCardComponent } from './category-card/category-card.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { YearComponent } from './year/year.component';
import { YearListComponent } from './year-list/year-list.component';
import { VideoCategoryComponent } from './video-category/video-category.component';
import { VideoListToolbarComponent } from './video-list-toolbar/video-list-toolbar.component';
import { VideoListComponent } from './video-list/video-list.component';

@NgModule({
    declarations: [
        CategoryCardComponent,
        PhotoCategoryComponent,
        CategoryListComponent,
        YearComponent,
        YearListComponent,
        VideoCategoryComponent,
        VideoListToolbarComponent,
        VideoListComponent
    ],
    imports: [
        CommonModule,
        CategoriesRoutingModule,
        SharedModule
    ]
})
export class CategoriesModule { }
