import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoryComponent } from './category/category.component';
import { CategoryCardComponent } from './category-card/category-card.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { YearComponent } from './year/year.component';
import { YearListComponent } from './year-list/year-list.component';

@NgModule({
    declarations: [
        CategoryCardComponent,
        CategoryComponent,
        CategoryListComponent,
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
