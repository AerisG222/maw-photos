import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

import { layoutReducer } from './reducer';

export const LAYOUT_FEATURE_NAME = 'layout';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        StoreModule.forFeature(LAYOUT_FEATURE_NAME, layoutReducer)
    ]
})
export class LayoutStoreModule { }
