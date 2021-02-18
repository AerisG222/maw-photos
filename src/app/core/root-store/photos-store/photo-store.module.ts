import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { PhotoStoreEffects } from './effects';
import { PHOTO_FEATURE_NAME } from './feature-name';
import { reducer } from './reducer';
import { PhotoStoreRoutingEffects } from './effects-routing';

@NgModule({
    declarations: [],
    imports: [
        StoreModule.forFeature(PHOTO_FEATURE_NAME, reducer),
        EffectsModule.forFeature([PhotoStoreEffects, PhotoStoreRoutingEffects]),
    ],
})
export class PhotoStoreModule {}
