import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { RandomComponent } from './random/random.component';
import { RandomRoutingModule } from './random-routing.module';

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
