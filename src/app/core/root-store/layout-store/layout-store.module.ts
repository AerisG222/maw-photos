import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { LAYOUT_FEATURE_NAME } from './feature-name';
import { layoutReducer } from './reducer';
import { LayoutStoreEffects } from './effects';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        FlexLayoutModule,
        StoreModule.forFeature(LAYOUT_FEATURE_NAME, layoutReducer),
        EffectsModule.forFeature([LayoutStoreEffects])
    ],
    providers: [
        LayoutStoreEffects
    ]
})
export class LayoutStoreModule { }
