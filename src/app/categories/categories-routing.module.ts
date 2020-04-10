import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { YearListComponent } from './year-list/year-list.component';
import { PhotoCategoriesResolverService } from 'src/app/core/services/photo-categories-resolver.service';
import { VideoCategoriesResolverService } from 'src/app/core/services/video-categories-resolver.service';

const routes: Routes = [
    { path: '',    component: YearListComponent, resolve: { PhotoCategoriesResolverService, VideoCategoriesResolverService }},
    { path: '**',  redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CategoriesRoutingModule { }
