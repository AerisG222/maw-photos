import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RandomComponent } from 'src/app/photos/random/random.component';
import { PhotoCategoriesResolverService } from 'src/app/core/services/photo-categories-resolver.service';

const routes: Routes = [
    { path: '', component: RandomComponent, resolve: { PhotoCategoriesResolverService }},
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RandomRoutingModule { }
