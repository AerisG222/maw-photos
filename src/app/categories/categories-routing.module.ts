import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { YearListComponent } from './components/year-list/year-list.component';
import { PhotoCategoriesResolverService, RouteHelperService, VideoCategoriesResolverService } from '@core/services';

const routes: Routes = [
    { path: ':view', component: YearListComponent, resolve: {
        photoCategoriesResolverService: PhotoCategoriesResolverService,
        videoCategoriesResolverService: VideoCategoriesResolverService }
    },
    { path: '', redirectTo: RouteHelperService.categoryViewDefault },
    { path: '**',  redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CategoriesRoutingModule { }
