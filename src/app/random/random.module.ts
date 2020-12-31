import { NgModule } from '@angular/core';

import { RandomRoutingModule } from './random-routing.module';
import { RandomComponent } from './components/random/random.component';
import { SharedModule } from '../shared/shared.module';
import { PhotosSharedModule } from '../photos-shared/photos-shared.module';


@NgModule({
    declarations: [
        RandomComponent,
    ],
    imports: [
        SharedModule,
        PhotosSharedModule,
        RandomRoutingModule
    ]
})
export class RandomModule { }
