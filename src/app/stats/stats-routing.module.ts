import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotoStatsComponent } from './photo-stats/photo-stats.component';

const routes: Routes = [
    { path: '', component: PhotoStatsComponent },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StatsRoutingModule { }
