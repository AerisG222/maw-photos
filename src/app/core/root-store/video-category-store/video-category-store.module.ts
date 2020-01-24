import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { VideoCategoryStoreEffects } from './effects';
import { VIDEO_CATEGORY_FEATURE_NAME } from './feature-name';
import { videoCategoryReducer } from './reducer';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        StoreModule.forFeature(VIDEO_CATEGORY_FEATURE_NAME, videoCategoryReducer),
        EffectsModule.forFeature([VideoCategoryStoreEffects])
    ]
})
export class VideoCategoryStoreModule { }
