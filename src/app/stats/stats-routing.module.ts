import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatType } from '@models';

import { CombinedStatsComponent } from './components/combined-stats/combined-stats.component';
import { PhotoStatsComponent } from './components/photo-stats/photo-stats.component';
import { VideoStatsComponent } from './components/video-stats/video-stats.component';

const routes: Routes = [
    { path: 'combined/:year', component: CombinedStatsComponent, data: { view: StatType.combined } },
    { path: 'combined', component: CombinedStatsComponent, data: { view: StatType.combined } },
    { path: 'photos/:year', component: PhotoStatsComponent, data: { view: StatType.photos } },
    { path: 'photos', component: PhotoStatsComponent, data: { view: StatType.photos } },
    { path: 'videos', component: VideoStatsComponent, data: { view: StatType.videos } },
    { path: 'videos/:year', component: VideoStatsComponent, data: { view: StatType.videos } },
    { path: '**', redirectTo: 'photos' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class StatsRoutingModule {}
