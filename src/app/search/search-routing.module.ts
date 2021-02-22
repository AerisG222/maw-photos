import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryViewMode, RouteHelper } from '@models';
import { GridViewComponent } from './components/grid-view/grid-view.component';
import { ListViewComponent } from './components/list-view/list-view.component';
import { ViewModeGuard } from './services/view-mode.guard';

const routes: Routes = [
    {
        path: 'grid',
        component: GridViewComponent,
        data: { view: CategoryViewMode.grid },
    },
    {
        path: 'list',
        component: ListViewComponent,
        data: { view: CategoryViewMode.list },
    },
    { path: '', redirectTo: 'grid', pathMatch: 'full' },
    { path: '**', redirectTo: RouteHelper.searchViewDefault },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SearchRoutingModule {}
