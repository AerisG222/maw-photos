import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { PhotoStoreEffects } from './effects';
import { PHOTO_FEATURE_NAME } from './feature-name';
import { photoReducer } from './reducer';

@NgModule({
    declarations: [],
    imports: [
        StoreModule.forFeature(PHOTO_FEATURE_NAME, photoReducer),
        EffectsModule.forFeature([PhotoStoreEffects])
    ]
})
export class PhotoStoreModule { }
