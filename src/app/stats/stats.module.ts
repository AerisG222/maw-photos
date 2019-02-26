import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { SharedModule } from 'src/app/shared/shared.module';
import { StatsRoutingModule } from './stats-routing.module';
import { PhotoStatsComponent } from './photo-stats/photo-stats.component';
import { StatChartComponent } from './stat-chart/stat-chart.component';
import { StatDetailCardComponent } from './stat-detail-card/stat-detail-card.component';
import { StatsHeaderComponent } from './header/stats-header.component';
import { StatsComponent } from './stats/stats.component';
import { VideoStatsComponent } from './video-stats/video-stats.component';

@NgModule({
    declarations: [
        PhotoStatsComponent,
        StatChartComponent,
        StatDetailCardComponent,
        StatsHeaderComponent,
        StatsComponent,
        VideoStatsComponent
    ],
    imports: [
        CommonModule,
        NgxChartsModule,
        SharedModule,
        StatsRoutingModule
    ]
})
export class StatsModule { }
