import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { PhotoStatsComponent } from './photo-stats/photo-stats.component';
import { StatsRoutingModule } from './stats-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [PhotoStatsComponent],
    imports: [
        CommonModule,
        NgxChartsModule,
        SharedModule,
        StatsRoutingModule
    ]
})
export class StatsModule { }
