import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RandomComponent } from './random/random.component';
import { PhotoCategoriesResolverService } from '../core/services/photo-categories-resolver.service';

const routes: Routes = [
    { path: '', component: RandomComponent, resolve: { PhotoCategoriesResolverService }},
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RandomRoutingModule { }
