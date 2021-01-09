import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { YearListComponent } from './year-list/year-list.component';
import { PhotoCategoriesResolverService, VideoCategoriesResolverService } from '@core/services';

const routes: Routes = [
    { path: '',    component: YearListComponent, resolve: {
        photoCategoriesResolverService: PhotoCategoriesResolverService,
        videoCategoriesResolverService: VideoCategoriesResolverService }
    },
    { path: '**',  redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CategoriesRoutingModule { }
