import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

import { layoutReducer } from './reducer';
import { LAYOUT_FEATURE_NAME } from './feature-name';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        StoreModule.forFeature(LAYOUT_FEATURE_NAME, layoutReducer)
    ]
})
export class LayoutStoreModule { }
