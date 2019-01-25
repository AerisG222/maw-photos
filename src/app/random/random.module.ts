import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RandomRoutingModule } from './random-routing.module';
import { RandomComponent } from './random/random.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        RandomComponent
    ],
    imports: [
        CommonModule,
        RandomRoutingModule,
        SharedModule
    ]
})
export class RandomModule { }
