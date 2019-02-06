import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { photoCategoryReducer } from './reducer';
import { PhotoCategoryStoreEffects } from './effects';
import { PHOTO_CATEGORY_FEATURE_NAME } from './feature-name';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        StoreModule.forFeature(PHOTO_CATEGORY_FEATURE_NAME, photoCategoryReducer),
        EffectsModule.forFeature([PhotoCategoryStoreEffects])
    ],
    providers: [
        PhotoCategoryStoreEffects
    ]
})
export class PhotoCategoryStoreModule { }
