import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotoCategoriesResolverService, VideoCategoriesResolverService } from '@core/services';
import { CombinedStatsComponent } from './components/combined-stats/combined-stats.component';
import { PhotoStatsComponent } from './components/photo-stats/photo-stats.component';
import { VideoStatsComponent } from './components/video-stats/video-stats.component';

const routes: Routes = [
    // eslint-disable-next-line max-len
    { path: 'combined', component: CombinedStatsComponent, resolve: {
        photoCategoriesResolverService: PhotoCategoriesResolverService,
        videoCategoriesResolverService: VideoCategoriesResolverService }},
    { path: 'photos',   component: PhotoStatsComponent,    resolve: { photoCategoriesResolverService: PhotoCategoriesResolverService }},
    { path: 'videos',   component: VideoStatsComponent,    resolve: { videoCategoriesResolverService: VideoCategoriesResolverService }},
    { path: '**', redirectTo: 'photos' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StatsRoutingModule { }
