import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotoCategoriesResolverService } from 'src/app/core/services/photo-categories-resolver.service';
import { PhotoCategoryComponent } from './photo-category/photo-category.component';
import { RandomComponent } from './random/random.component';


const routes: Routes = [
    { path: 'random', component: RandomComponent, resolve: { PhotoCategoriesResolverService }},
    { path: ':id', component: PhotoCategoryComponent, resolve: { PhotoCategoriesResolverService }},
    { path: '**',  redirectTo: '/categories' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PhotosRoutingModule { }
