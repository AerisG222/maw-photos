import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { VideoCategoryStoreEffects } from './effects';
import { VIDEO_CATEGORY_FEATURE_NAME } from './feature-name';
import { reducer } from './reducer';

@NgModule({
    declarations: [],
    imports: [
        StoreModule.forFeature(VIDEO_CATEGORY_FEATURE_NAME, reducer),
        EffectsModule.forFeature([VideoCategoryStoreEffects])
    ]
})
export class VideoCategoryStoreModule { }
