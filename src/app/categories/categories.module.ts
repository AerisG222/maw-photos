import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { CategoriesRoutingModule } from './categories-routing.module';

import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { CategoryTypeFilterComponent } from './components/category-type-filter/category-type-filter.component';
import { CategoryYearFilterComponent } from './components/category-year-filter/category-year-filter.component';
import { CategoryMissingGpsFilterComponent } from './components/category-missing-gps-filter/category-missing-gps-filter.component';
import { YearComponent } from './components/year/year.component';
import { YearListComponent } from './components/year-list/year-list.component';
import { CategoriesStoreModule } from './store/categories-store.module';
import { CategoriesUrlService } from './services/categories-url.service';
import { ViewModeGuard } from './services/view-mode.guard';

@NgModule({
    declarations: [
        ToolbarComponent,
        CategoryTypeFilterComponent,
        CategoryYearFilterComponent,
        YearComponent,
        YearListComponent,
        CategoryMissingGpsFilterComponent
    ],
    imports: [
        CategoriesRoutingModule,
        CategoriesStoreModule,
        SharedModule
    ],
    providers: [
        CategoriesUrlService,
        ViewModeGuard
    ]
})
export class CategoriesModule { }
