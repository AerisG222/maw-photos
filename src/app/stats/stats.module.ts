import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { PhotoStatsComponent } from './photo-stats/photo-stats.component';
import { StatsRoutingModule } from './stats-routing.module';
import { SharedModule } from '../shared/shared.module';
import { YearStatsComponent } from './year-stats/year-stats.component';
import { StatChartComponent } from './stat-chart/stat-chart.component';
import { StatDetailCardComponent } from './stat-detail-card/stat-detail-card.component';

@NgModule({
    declarations: [
        PhotoStatsComponent,
        YearStatsComponent,
        StatChartComponent,
        StatDetailCardComponent
    ],
    imports: [
        CommonModule,
        NgxChartsModule,
        SharedModule,
        StatsRoutingModule
    ]
})
export class StatsModule { }
