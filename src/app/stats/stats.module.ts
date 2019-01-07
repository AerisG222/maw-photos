import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { AppMaterialModule } from '../app-material.module';
import { PhotoStatsComponent } from './photo-stats/photo-stats.component';
import { StatsRoutingModule } from './stats-routing.module';

@NgModule({
    declarations: [PhotoStatsComponent],
    imports: [
        AppMaterialModule,
        CommonModule,
        NgxChartsModule,
        StatsRoutingModule
    ]
})
export class StatsModule { }
