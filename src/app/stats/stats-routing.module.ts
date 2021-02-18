import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CombinedStatsComponent } from './components/combined-stats/combined-stats.component';
import { PhotoStatsComponent } from './components/photo-stats/photo-stats.component';
import { VideoStatsComponent } from './components/video-stats/video-stats.component';

const routes: Routes = [
    { path: 'combined', component: CombinedStatsComponent },
    { path: 'photos', component: PhotoStatsComponent },
    { path: 'videos', component: VideoStatsComponent },
    { path: '**', redirectTo: 'photos' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class StatsRoutingModule {}
