import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { RandomComponent } from './random/random.component';
import { RandomRoutingModule } from './random-routing.module';

@NgModule({
    declarations: [
        RandomComponent
    ],
    imports: [
        RandomRoutingModule,
        SharedModule
    ]
})
export class RandomModule { }
