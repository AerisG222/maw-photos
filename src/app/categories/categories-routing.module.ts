import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GridViewComponent } from './components/grid-view/grid-view.component';
import { ListViewComponent } from './components/list-view/list-view.component';
import { ViewModeGuard } from './services/view-mode.guard';

const routes: Routes = [
    { path: 'grid', component: GridViewComponent },
    { path: 'list', component: ListViewComponent },
    { path: '', canActivate: [ViewModeGuard] },
    { path: '**', redirectTo: '' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CategoriesRoutingModule {}
