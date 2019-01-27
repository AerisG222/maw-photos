import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoryComponent } from './category/category.component';
import { CategoryCardComponent } from './category-card/category-card.component';
import { YearListComponent } from './year-list/year-list.component';
import { SharedModule } from '../shared/shared.module';
import { YearComponent } from './year/year.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryHeaderComponent } from './category-header/category-header.component';

@NgModule({
    declarations: [
        CategoryCardComponent,
        CategoryComponent,
        YearComponent,
        YearListComponent,
        CategoryListComponent,
        CategoryHeaderComponent
    ],
    imports: [
        CommonModule,
        CategoriesRoutingModule,
        SharedModule
    ]
})
export class CategoriesModule { }
