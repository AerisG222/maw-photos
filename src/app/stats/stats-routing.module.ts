import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotoCategoriesResolverService } from '../core/services/photo-categories-resolver.service';
import { VideoCategoriesResolverService } from '../core/services/video-categories-resolver.service';
import { CombinedStatsComponent } from './combined-stats/combined-stats.component';
import { PhotoStatsComponent } from './photo-stats/photo-stats.component';
import { VideoStatsComponent } from './video-stats/video-stats.component';

const routes: Routes = [
    // tslint:disable-next-line: max-line-length
    { path: 'combined', component: CombinedStatsComponent, resolve: { PhotoCategoriesResolverService, VideoCategoriesResolverService }},
    { path: 'photos',   component: PhotoStatsComponent,    resolve: { PhotoCategoriesResolverService }},
    { path: 'videos',   component: VideoStatsComponent,    resolve: { VideoCategoriesResolverService }},
    { path: '**', redirectTo: 'photos' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StatsRoutingModule { }
