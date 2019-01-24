import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoryComponent } from './category/category.component';
import { CategoryCardComponent } from './category-card/category-card.component';
import { HomeComponent } from './home/home.component';
import { YearListComponent } from './year-list/year-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        CategoryCardComponent,
        CategoryComponent,
        HomeComponent,
        YearListComponent
    ],
    imports: [
        CommonModule,
        CategoriesRoutingModule,
        SharedModule
    ]
})
export class CategoriesModule { }
