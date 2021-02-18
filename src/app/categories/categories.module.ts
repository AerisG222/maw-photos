import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { CategoriesRoutingModule } from './categories-routing.module';

import { CategoryTypeFilterComponent } from './components/category-type-filter/category-type-filter.component';
import { CategoryYearFilterComponent } from './components/category-year-filter/category-year-filter.component';
import { CategoryMissingGpsFilterComponent } from './components/category-missing-gps-filter/category-missing-gps-filter.component';
import { YearComponent } from './components/year/year.component';
import { CategoriesStoreModule } from './store/categories-store.module';
import { CategoriesUrlService } from './services/categories-url.service';
import { ViewModeGuard } from './services/view-mode.guard';
import { ToolbarGroupSelectViewComponent } from './components/toolbar-group-select-view/toolbar-group-select-view.component';
import { GridToolbarComponent } from './components/grid-toolbar/grid-toolbar.component';
import { ListToolbarComponent } from './components/list-toolbar/list-toolbar.component';
import { FilterBarComponent } from './components/filter-bar/filter-bar.component';
import { GridViewComponent } from './components/grid-view/grid-view.component';
import { ListViewComponent } from './components/list-view/list-view.component';

@NgModule({
    declarations: [
        CategoryTypeFilterComponent,
        CategoryYearFilterComponent,
        YearComponent,
        CategoryMissingGpsFilterComponent,
        ToolbarGroupSelectViewComponent,
        GridToolbarComponent,
        ListToolbarComponent,
        FilterBarComponent,
        GridViewComponent,
        ListViewComponent,
    ],
    imports: [CategoriesRoutingModule, CategoriesStoreModule, SharedModule],
    providers: [CategoriesUrlService, ViewModeGuard],
})
export class CategoriesModule {}
