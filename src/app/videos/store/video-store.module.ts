import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { VideoStoreEffects } from './effects';
import { VideoStoreRoutingEffects } from './effects-routing';
import { VIDEO_FEATURE_NAME } from './feature-name';
import { reducer } from './reducer';

@NgModule({
    declarations: [],
    imports: [
        StoreModule.forFeature(VIDEO_FEATURE_NAME, reducer),
        EffectsModule.forFeature([VideoStoreEffects, VideoStoreRoutingEffects]),
    ],
})
export class VideoStoreModule {}
