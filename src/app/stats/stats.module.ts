import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatsRoutingModule } from './stats-routing.module';
import { PhotoStatsComponent } from './photo-stats/photo-stats.component';

@NgModule({
  declarations: [PhotoStatsComponent],
  imports: [
    CommonModule,
    StatsRoutingModule
  ]
})
export class StatsModule { }
