import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { YearListComponent } from './components/year-list/year-list.component';
import { RouteHelperService } from '@core/services';
import { UrlGuardGuard } from './services/url-guard.guard';

const routes: Routes = [
    { path: ':view', component: YearListComponent, canActivate: [ UrlGuardGuard ] },
    { path: '', redirectTo: RouteHelperService.categoryViewDefault },
    { path: '**',  redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CategoriesRoutingModule { }
