import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { PhotoCategoryStoreEffects } from './effects';
import { PHOTO_CATEGORY_FEATURE_NAME } from './feature-name';
import { photoCategoryReducer } from './reducer';

@NgModule({
    declarations: [],
    imports: [
        StoreModule.forFeature(PHOTO_CATEGORY_FEATURE_NAME, photoCategoryReducer),
        EffectsModule.forFeature([PhotoCategoryStoreEffects])
    ]
})
export class PhotoCategoryStoreModule { }
