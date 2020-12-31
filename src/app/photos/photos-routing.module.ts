/* eslint-disable max-len */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotoCategoriesResolverService } from 'src/app/core/services/photo-categories-resolver.service';
import { PhotoCategoryComponent } from './components/photo-category/photo-category.component';

const routes: Routes = [
    { path: ':categoryId', component: PhotoCategoryComponent, resolve: { photoCategoriesResolverService: PhotoCategoriesResolverService } },
    { path: ':categoryId/:photoId', component: PhotoCategoryComponent, resolve: { photoCategoriesResolverService: PhotoCategoriesResolverService } },
    { path: '**', redirectTo: '/categories' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PhotosRoutingModule { }
