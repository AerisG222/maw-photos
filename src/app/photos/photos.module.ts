import { NgModule } from '@angular/core';

import { PhotosRoutingModule } from './photos-routing.module';
import { PhotoCategoryComponent } from './photo-category/photo-category.component';
import { RandomComponent } from './random/random.component';
import { SharedModule } from '../shared/shared.module';
import { PhotoStoreModule } from './store';


@NgModule({
    declarations: [
        PhotoCategoryComponent,
        RandomComponent
    ],
    imports: [
        SharedModule,
        PhotosRoutingModule,
        PhotoStoreModule
    ]
})
export class PhotosModule { }
