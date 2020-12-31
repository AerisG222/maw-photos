import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PhotoCategoriesResolverService } from '../core/services/photo-categories-resolver.service';

import { RandomComponent } from './components/random/random.component';

const routes: Routes = [
    { path: '', component: RandomComponent, resolve: { photoCategoriesResolverService: PhotoCategoriesResolverService } },
    { path: ':idx', component: RandomComponent, resolve: { photoCategoriesResolverService: PhotoCategoriesResolverService } },
    { path: '**', redirectTo: '/random' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RandomRoutingModule { }
