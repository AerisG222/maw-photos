import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { YearListComponent } from './year-list/year-list.component';
import { PhotoCategoriesResolverService } from '@core/services/photo-categories-resolver.service';
import { VideoCategoriesResolverService } from '@core/services/video-categories-resolver.service';

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
