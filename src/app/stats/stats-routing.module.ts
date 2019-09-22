import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatsComponent } from './stats/stats.component';
import { PhotoCategoriesResolverService } from '../core/services/photo-categories-resolver.service';
import { VideoCategoriesResolverService } from '../core/services/video-categories-resolver.service';

const routes: Routes = [
    // tslint:disable-next-line: max-line-length
    { path: 'combined', component: StatsComponent, data: { view: 'combined' }, resolve: { PhotoCategoriesResolverService, VideoCategoriesResolverService }},
    { path: 'photos',   component: StatsComponent, data: { view: 'photos' },   resolve: { PhotoCategoriesResolverService }},
    { path: 'videos',   component: StatsComponent, data: { view: 'videos' },   resolve: { VideoCategoriesResolverService }},
    { path: '**', redirectTo: 'photos' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StatsRoutingModule { }
