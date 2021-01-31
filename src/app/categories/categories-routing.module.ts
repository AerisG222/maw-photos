import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { YearListComponent } from './components/year-list/year-list.component';
import { RouteHelper } from '@models';
import { ViewModeGuard } from './services/view-mode.guard';

const routes: Routes = [
    { path: ':view', component: YearListComponent },
    { path: '', canActivate: [ ViewModeGuard ]},
    { path: '**',  redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CategoriesRoutingModule { }
