import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotoCategoryComponent } from './photo-category/photo-category.component';
import { YearListComponent } from './year-list/year-list.component';
import { VideoCategoryComponent } from './video-category/video-category.component';
import { PhotoCategoriesResolverService } from '../core/services/photo-categories-resolver.service';
import { VideoCategoriesResolverService } from '../core/services/video-categories-resolver.service';

const routes: Routes = [
    { path: '',    component: YearListComponent, resolve: { PhotoCategoriesResolverService, VideoCategoriesResolverService }},
    { path: 'photos/:id', component: PhotoCategoryComponent, resolve: { PhotoCategoriesResolverService }},
    { path: 'videos/:id', component: VideoCategoryComponent, resolve: { VideoCategoriesResolverService }},
    { path: '**',  redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CategoriesRoutingModule { }
