import { NgModule } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { SharedModule } from 'src/app/shared/shared.module';
import { StatsRoutingModule } from './stats-routing.module';
import { PhotoStatsComponent } from './photo-stats/photo-stats.component';
import { StatChartComponent } from './stat-chart/stat-chart.component';
import { StatsHeaderComponent } from './header/stats-header.component';
import { StatsComponent } from './stats/stats.component';
import { VideoStatsComponent } from './video-stats/video-stats.component';
import { StatsToolbarComponent } from './stats-toolbar/stats-toolbar.component';
import { CombinedStatsComponent } from './combined-stats/combined-stats.component';
import { StatCardComponent } from './stat-card/stat-card.component';
import { StatsLayoutComponent } from './stats-layout/stats-layout.component';

@NgModule({
    declarations: [
        PhotoStatsComponent,
        StatChartComponent,
        StatsHeaderComponent,
        StatsComponent,
        VideoStatsComponent,
        StatsToolbarComponent,
        CombinedStatsComponent,
        StatCardComponent,
        StatsLayoutComponent
    ],
    imports: [
        NgxChartsModule,
        SharedModule,
        StatsRoutingModule
    ]
})
export class StatsModule { }
