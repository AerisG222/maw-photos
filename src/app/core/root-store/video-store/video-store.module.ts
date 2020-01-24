import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { VideoStoreEffects } from './effects';
import { VIDEO_FEATURE_NAME } from './feature-name';
import { videoReducer } from './reducer';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        StoreModule.forFeature(VIDEO_FEATURE_NAME, videoReducer),
        EffectsModule.forFeature([VideoStoreEffects])
    ]
})
export class VideoStoreModule { }
