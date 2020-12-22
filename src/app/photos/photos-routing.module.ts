import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotoCategoriesResolverService } from 'src/app/core/services/photo-categories-resolver.service';
import { PhotoCategoryComponent } from './components/photo-category/photo-category.component';
import { RandomComponent } from './components/random/random.component';


const routes: Routes = [
    { path: 'random', component: RandomComponent, resolve: { photoCategoriesResolverService: PhotoCategoriesResolverService } },
    { path: ':id', component: PhotoCategoryComponent, resolve: { photoCategoriesResolverService: PhotoCategoriesResolverService } },
    { path: '**', redirectTo: '/categories' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PhotosRoutingModule { }
