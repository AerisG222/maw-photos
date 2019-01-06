import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatsRoutingModule } from './stats-routing.module';
import { PhotoStatsComponent } from './photo-stats/photo-stats.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [PhotoStatsComponent],
  imports: [
    CommonModule,
    NgxChartsModule,
    StatsRoutingModule
  ]
})
export class StatsModule { }
