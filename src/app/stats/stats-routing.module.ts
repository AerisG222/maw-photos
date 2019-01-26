import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotoStatsComponent } from './photo-stats/photo-stats.component';
import { YearStatsComponent } from './year-stats/year-stats.component';

const routes: Routes = [
    { path: '', component: PhotoStatsComponent },
    { path: 'year/:id', component: YearStatsComponent },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StatsRoutingModule { }
