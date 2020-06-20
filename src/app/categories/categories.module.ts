import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { CategoriesRoutingModule } from './categories-routing.module';

import { CategoryTypeFilterComponent } from './category-type-filter/category-type-filter.component';
import { CategoryYearFilterComponent } from './category-year-filter/category-year-filter.component';
import { CategoryMissingGpsFilterComponent } from './category-missing-gps-filter/category-missing-gps-filter.component';
import { YearComponent } from './year/year.component';
import { YearListComponent } from './year-list/year-list.component';

@NgModule({
    declarations: [
        CategoryTypeFilterComponent,
        CategoryYearFilterComponent,
        YearComponent,
        YearListComponent,
        CategoryMissingGpsFilterComponent
    ],
    imports: [
        CategoriesRoutingModule,
        SharedModule
    ]
})
export class CategoriesModule { }
