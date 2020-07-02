import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { VideoStoreEffects } from './effects';
import { VIDEO_FEATURE_NAME } from './feature-name';
import { reducer } from './reducer';

@NgModule({
    declarations: [],
    imports: [
        StoreModule.forFeature(VIDEO_FEATURE_NAME, reducer),
        EffectsModule.forFeature([VideoStoreEffects])
    ]
})
export class VideoStoreModule { }
