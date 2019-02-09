import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { PhotoStoreEffects } from './effects';
import { PHOTO_FEATURE_NAME } from './feature-name';
import { photoReducer } from './reducer';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        StoreModule.forFeature(PHOTO_FEATURE_NAME, photoReducer),
        EffectsModule.forFeature([PhotoStoreEffects])
    ],
    providers: [
        PhotoStoreEffects
    ]
})
export class PhotoStoreModule { }
