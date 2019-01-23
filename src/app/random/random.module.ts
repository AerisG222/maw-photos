import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RandomRoutingModule } from './random-routing.module';
import { RandomComponent } from './random/random.component';
import { AppMaterialModule } from '../app-material.module';

@NgModule({
    declarations: [
        RandomComponent
    ],
    imports: [
        AppMaterialModule,
        CommonModule,
        RandomRoutingModule
    ]
})
export class RandomModule { }
