import { NgModule } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { SharedModule } from '@shared/shared.module';
import { StatsRoutingModule } from './stats-routing.module';

import { CombinedStatsComponent } from './components/combined-stats/combined-stats.component';
import { HeaderComponent } from './components/header/header.component';
import { LayoutComponent } from './components/layout/layout.component';
import { PhotoStatsComponent } from './components/photo-stats/photo-stats.component';
import { StatCardComponent } from './components/stat-card/stat-card.component';
import { StatChartComponent } from './components/stat-chart/stat-chart.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { VideoStatsComponent } from './components/video-stats/video-stats.component';
import { AggregateByFormComponent } from './components/aggregate-by-form/aggregate-by-form.component';
import { StatsStoreModule } from './store';

@NgModule({
    declarations: [
        CombinedStatsComponent,
        HeaderComponent,
        LayoutComponent,
        PhotoStatsComponent,
        StatChartComponent,
        StatCardComponent,
        ToolbarComponent,
        VideoStatsComponent,
        AggregateByFormComponent,
    ],
    imports: [
        NgxChartsModule,
        SharedModule,
        StatsRoutingModule,
        StatsStoreModule,
    ],
})
export class StatsModule {}
