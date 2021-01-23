import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { YearListComponent } from './components/year-list/year-list.component';
import { RouteHelper } from '@models';

const routes: Routes = [
    { path: ':view', component: YearListComponent },
    { path: '', redirectTo: RouteHelper.categoryViewDefault },
    { path: '**',  redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CategoriesRoutingModule { }
