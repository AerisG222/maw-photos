import { NgModule } from '@angular/core';

import { RandomRoutingModule } from './random-routing.module';
import { RandomComponent } from './components/random/random.component';
import { SharedModule } from '../shared/shared.module';
import { PhotosSharedModule } from '../photos-shared/photos-shared.module';
import { Navigable } from '../models/store-facades/navigable';
import { RandomStoreFacadeService } from './services/random-store-facade.service';


@NgModule({
    declarations: [
        RandomComponent,
    ],
    imports: [
        SharedModule,
        PhotosSharedModule,
        RandomRoutingModule
    ],
    providers: [
        RandomStoreFacadeService,
        { provide: Navigable, useExisting: RandomStoreFacadeService }
    ]
})
export class RandomModule { }
