import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatsComponent } from './stats/stats.component';
import { PhotoCategoriesResolverService } from '../core/services/photo-categories-resolver.service';
import { VideoCategoriesResolverService } from '../core/services/video-categories-resolver.service';

const routes: Routes = [
    { path: '', component: StatsComponent, resolve: { PhotoCategoriesResolverService, VideoCategoriesResolverService }},
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StatsRoutingModule { }
